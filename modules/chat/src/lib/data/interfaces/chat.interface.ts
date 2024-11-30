import { Profile } from "@psam/profile-data"

export interface Chat {
  id: number,
  userFirst: Profile,
  userSecond: Profile,
  messages: Message[],
  companion?: Profile
}

export interface MyChat {
   id: number,
   userFrom: Profile,
   message: string,
   createdAt: string
}

export interface Message {
  id: number,
  userFromId: number,
  personalChatId: number,
  text: string,
  createdAt: string,
  isRead: boolean,
  updatedAt?: string,
  user?: Profile,
  isMine?: boolean
}

