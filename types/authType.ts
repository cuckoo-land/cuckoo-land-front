interface IResponse {
  status: number;
  data: IData;
  headers: IHeaders;
}

interface IData {
  nickname: string;
  roleType: string;
}

interface IHeaders {
  authorization: string;
  refreshtoken: string;
}

export interface IAuthAPI {
  join: (memberId: string, nickname: string, password: string) => Promise<IResponse>;
  memberidCheck: (memberId: string) => Promise<IResponse>;
  nicknameCheck: (nickname: string) => Promise<IResponse>;
  login: (id: string, password: string) => Promise<IResponse>;
  guestLogin: (nickname: string) => Promise<IResponse>;
  guestLogout: () => Promise<IResponse>;
}
