import { Comment } from "./comment.interface"
import { Like } from "./like.interface"

export interface PostCreateDto {
   Title: string,
   Content: string
}

export interface Post {
   Id: number,
   Title: string,
   Content: string,
   Author: Profile,
   images?: string[],
   CreatedAt: string,
   UpdatedAt: string,
   PostLikes: Like[],
   Comments: Comment[]
}

interface Profile {
   AccountId: number,
   Username: string,
   ImageBase64: string | null,
   SubscriberAmount: number,
   FirstName: string,
   LastName: string,
   Description: string,
   IsActive: boolean,
   City: string,
   isSubscriber?: boolean,
   isSubscpription?: boolean, 
}