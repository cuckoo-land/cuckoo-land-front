import { IAuthAPI } from 'types/authType';
import { api } from './core/instance';

export const authAPI: IAuthAPI = {
  join: (memberId, nickname, password) => api.post('/join', { memberId, nickname, password }),
  memberidCheck: (memberId) => api.post('/join/idcheck', { memberId }),
  nicknameCheck: (nickname) => api.post('/join/nickcheck', { nickname }),
  login: (memberId, password) => api.post('/login', { memberId, password }),
  guestLogin: (nickname) => api.post('/guest/login', { nickname }),
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
