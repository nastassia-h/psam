import { Injectable, inject } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Comment, CommentCreateDto } from "../interfaces/comment.interface";
import { PostService } from "./post.service";
import { Post } from "../interfaces/post.interface";
import { map } from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class CommentService {
   #http = inject(HttpClient);
   baseApiUrl = 'http://localhost:5269/'

   postService = inject(PostService);
   posts = this.postService.posts

   createComment(payload: CommentCreateDto) {
      const params = new HttpParams()
         .set('Text', payload.Text)
         .set('PostId', payload.PostId);
      return this.#http.post<Comment>(`${this.baseApiUrl}CreateComment`, {}, {params})
   }

   getCommentsByPost(id: number) {
      return this.#http.get<Comment[]>(`${this.baseApiUrl}GetAllCommentsFromPost/${id}`)
   }
}