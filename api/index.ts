import { api } from './core/instance';

export const authAPI = {
  join: (data: any) => api.post('/join', data),
  memberidCheck: (data: any) => api.post('/join/idcheck', data),
  nicknameCheck: (data: any) => api.post('/join/nickcheck', data),

  login: (data: any) => api.post('/login', data),
  guestLogin: (data: any) => api.post('/guest/login', data),
  guestLogout: () => api.delete('/guest/out'),
};

export const MenuAPI = {
  getUserInfo: () => api.post(``),
};

export const gameroomAPI = {};

export const rankAPI = {
  getMafiaRankList: () => api.get(`/ranking/mafia/total`),
  getMafiaRankDetail: (memberId: string | string[] | undefined) => api.get(`/ranking/mafia/${memberId}`),

  getMajorityRankList: () => api.get(`/ranking/majority/total`),
  getMajorityRankDetail: (memberId: string | string[] | undefined) => api.get(`/ranking/majority/${memberId}`),
};
