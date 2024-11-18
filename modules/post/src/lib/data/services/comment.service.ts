import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
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
      return this.#http.post<Comment>(this.baseApiUrl, payload)
   }

   getCommentsByPost(id: number) {
      return this.#http.get<Post>(`${this.baseApiUrl}GetAllCommentsFromPost/` + id)
         .pipe(
            map(res => res.Comments)
         )
   }
}