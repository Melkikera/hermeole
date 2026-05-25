const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function readSdkFromLocalProperties() {
  try {
    const localPropertiesPath = path.resolve(__dirname, '..', 'android', 'local.properties');
    if (!fs.existsSync(localPropertiesPath)) {
      return null;
    }

    const fileText = fs.readFileSync(localPropertiesPath, 'utf8');
    const match = fileText.match(/^sdk\.dir=(.+)$/m);
    if (!match || !match[1]) {
      return null;
    }

    // local.properties escapes backslashes on Windows: C:\\Users\\...
    return match[1].trim().replace(/\\\\/g, '\\');
  } catch {
    return null;
  }
}

const SDK_ROOT = process.env.ANDROID_SDK_ROOT || process.env.ANDROID_HOME || readSdkFromLocalProperties();

if (!SDK_ROOT) {
  console.error('ANDROID_SDK_ROOT (or ANDROID_HOME) is not set.');
  console.error('Set it to your Android SDK path, or add sdk.dir to android/local.properties.');
  process.exit(1);
}

const adb = path.join(SDK_ROOT, 'platform-tools', process.platform === 'win32' ? 'adb.exe' : 'adb');
const emulator = path.join(SDK_ROOT, 'emulator', process.platform === 'win32' ? 'emulator.exe' : 'emulator');

function run(cmd, args) {
  return spawnSync(cmd, args, { encoding: 'utf8' });
}

function hasRunningEmulator() {
  const out = run(adb, ['devices']);
  const text = `${out.stdout || ''}\n${out.stderr || ''}`;
  return /emulator-\d+\s+device/i.test(text);
}

function getFirstAvd() {
  const out = run(emulator, ['-list-avds']);
  if (out.error) {
    return null;
  }
  const avds = (out.stdout || '')
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
  return avds[0] || null;
}

function startEmulator(avdName) {
  const child = spawn(emulator, ['-avd', avdName], {
    detached: true,
    stdio: 'ignore',
  });
  child.unref();
}

function waitForDevice(timeoutMs = 180000, intervalMs = 2000) {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const timer = setInterval(() => {
      if (hasRunningEmulator()) {
        clearInterval(timer);
        resolve();
        return;
      }

      if (Date.now() - start > timeoutMs) {
        clearInterval(timer);
        reject(new Error('Timed out waiting for Android emulator to be ready.'));
      }
    }, intervalMs);
  });
}

function runExpoAndroid() {
  const expoCommand = process.platform === 'win32' ? 'npx expo run:android' : 'npx expo run:android';
  const child = spawn(expoCommand, [], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => process.exit(code || 0));
}

async function main() {
  if (hasRunningEmulator()) {
    console.log('Emulator already running.');
    runExpoAndroid();
    return;
  }

  const avd = getFirstAvd();
  if (!avd) {
    console.error('No AVD found. Create one in Android Studio Device Manager first.');
    process.exit(1);
  }

  console.log(`Starting emulator: ${avd}`);
  startEmulator(avd);
  console.log('Waiting for emulator to become available in ADB...');
  await waitForDevice();
  console.log('Emulator is ready. Running Expo Android build...');
  runExpoAndroid();
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
