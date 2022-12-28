export type Member = {
  memberId: string;
  nickname: string;
  roleType: string;
};

export interface IEnterResponse {
  type: string;
  member: Member;
}

export interface IChatResponse {
  type: string;
  sender: string;
  roomId: string;
  message: string;
}

export interface IChatRequest {
  type: string;
  sender: string;
  roomId: string;
  message: string;
}

export interface IGameStartRequest {
  round: string;
  gameType: number;
  roomId: string;
}
