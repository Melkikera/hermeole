const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT || 7158);

app.use(cors());
app.use(express.json());

const users = [
  {
    id: 1,
    userName: 'demo',
    email: 'demo@example.com',
    password: 'demo1234',
    name: 'Demo User',
  },
];

app.get('/api', (_req, res) => {
  res.json({
    name: 'hermeole-express-api',
    status: 'ok',
    endpoints: ['/api', '/api/health', '/api/login', '/api/users'],
  });
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    res.status(400).json({ message: 'email and password are required' });
    return;
  }

  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) {
    res.status(401).json({ message: 'invalid credentials' });
    return;
  }

  res.json({
    token: `fake-token-${found.id}`,
    loggeduser: found.name,
    user: {
      id: found.id,
      userName: found.userName,
      email: found.email,
      name: found.name,
    },
  });
});

app.post('/api/users', (req, res) => {
  const { userName, email, password, name } = req.body || {};

  if (!userName || !email || !password || !name) {
    res.status(400).json({ message: 'userName, email, password and name are required' });
    return;
  }

  const exists = users.some((u) => u.email === email);
  if (exists) {
    res.status(409).json({ message: 'email already exists' });
    return;
  }

  const newUser = {
    id: users.length + 1,
    userName,
    email,
    password,
    name,
  };

  users.push(newUser);

  res.status(201).json({
    id: newUser.id,
    userName: newUser.userName,
    email: newUser.email,
    name: newUser.name,
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Express API running on http://0.0.0.0:${port}/api`);
});
