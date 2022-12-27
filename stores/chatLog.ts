// import { action, computed, observable, reaction } from 'mobx';
// import { createContext } from 'react';

// export interface ILog {
//   type: string;
//   [key: string]: any;
// }

// class ChatLogStore {
//   constructor() {
//     reaction(
//       () => this.chatLog,
//       () => console.log(this.chatLog.length)
//     );
//   }

//   @observable chatLog: ILog[] = [];

//   @action addLog = (log: ILog) => {
//     this.chatLog.push(log);
//   };
// }

// export default createContext(new ChatLogStore());

export interface Temp {
  type: string;
}
