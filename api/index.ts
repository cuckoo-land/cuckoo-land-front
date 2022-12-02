import { api } from './core/instance';

export const authAPI = {
  login: (data: any) => api.post('/login', data),
  join: (data: any) => api.post('/join', data),
  guestLogin: (data: any) => api.get('/guest/login', data),
};
