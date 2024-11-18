export interface Profile {
   AccountId: number,
   Username: string,
   ImageBase64: string | null,
   SubscriberAmount: number,
   FirstName: string,
   LastName: string,
   Description: string,
   IsActive: boolean,
   Technologies: Technology[],
   City: string,
   isSubscriber?: boolean,
   isSubscpription?: boolean, 
}

export interface Technology {
   TechnologyId: number,
   AccountId: number,
   Technology: string
}

export interface ProfileShort {
   AccountId: number,
   Username: string,
   ImageBase64: string,
   SubscriberAmount: number
}