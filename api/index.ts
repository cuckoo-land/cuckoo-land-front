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
  getUserInfo: (id: string) => api.post(`/memberinfo/${id}`),
  changeUsername: (data: { nickname: string }) => api.put(`auth/updatenickname`, data),
  getFriendList: () => api.get(`auth/friend`),
  addFriend: (data: { friendId: string }) => api.post(`auth/friend`, data),
  deleteFriend: (friendId: string) => api.delete(`auth/friend/${friendId}`),
};

export const gameroomAPI = {};

export const rankAPI = {
  getMafiaRankList: () => api.get(`/ranking/mafia/total`),
  getMafiaRankDetail: (memberId: string | string[] | undefined) => api.get(`/ranking/mafia/${memberId}`),

  getMajorityRankList: () => api.get(`/ranking/majority/total`),
  getMajorityRankDetail: (memberId: string | string[] | undefined) => api.get(`/ranking/majority/${memberId}`),
};
