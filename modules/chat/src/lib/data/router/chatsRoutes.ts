import { Route } from "@angular/router";
import { ChatsPageComponent } from "../../feature-chats/chats-page/chats-page.component";
import { ChatWorkspaceComponent } from "../../feature-chats/chat-workspace/chat-workspace.component";

export const chatsRoutes: Route[] = [
   {
      path: '', 
      component: ChatsPageComponent, 
      children: [
         {
            path: ':id', 
            component: ChatWorkspaceComponent
         }
      ]
   }
]