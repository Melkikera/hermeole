export type Weather = {
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
};

export type Prim = {
  id: string;
  name: string;
  value: number;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export type LoginModel = {
  email: string;
  password: string;
};

export type LoginOkResponse = {
  message: string;
  loggeduser: string;
};