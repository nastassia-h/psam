export interface CommentCreateDto {
     Text: string,
     PostId: number,
     ParentCommentId: number | null
}

export interface Comment {
     Id: number,
     Text: string,
     Author: Profile,
     PostId: number,
     ParentCommentId: number,
     CreatedAt: string,
     UpdatedAt: string
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