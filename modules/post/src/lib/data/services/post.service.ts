import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { LikesCount, Post, PostCreateDto } from "../interfaces/post.interface";
import { switchMap, tap } from "rxjs";

@Injectable({
   providedIn: 'root'
})
export class PostService {
   #http = inject(HttpClient)
   baseApiUrl = 'http://localhost:5269/'

   posts = signal<Post[]>([])


   createPost(payload: PostCreateDto) {
      const params = new HttpParams()
         .set('Title', payload.Title)
         .set('Content', payload.Content);
      return this.#http.post<Post>(`${this.baseApiUrl}CreatePost`, {}, {params})
         .pipe(
            switchMap(() => {return this.fetchPosts()})
         )
   }

   fetchPosts() {
      return this.#http.get<Post[]>(`${this.baseApiUrl}GetPosts`)
         .pipe(
            tap(res => this.posts.set(res.reverse()))
         )
   }

   fetchSubscribedPosts(id: number) {
      return this.#http.get<Post[]>(`${this.baseApiUrl}SubscribedPosts/${id}`)
         .pipe(
            tap(res => this.posts.set(res.reverse()))
         )
   }

   fetchPostLikesCount(id: number) {
      return this.#http.get<LikesCount>(`${this.baseApiUrl}GetPostLikesCount/${id}`)
   }

   createLike(postId: number) {
      return this.#http.post<string>(`${this.baseApiUrl}LikePost/${postId}`, {})
   }

   deleteLike(postId: number) {
      return this.#http.delete<string>(`${this.baseApiUrl}UnlikePost/${postId}`)
   }
}