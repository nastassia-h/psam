import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { Post, PostCreateDto } from "../interfaces/post.interface";
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

   createLike(postId: number) {
      return this.#http.post<string>(`${this.baseApiUrl}LikePost/${postId}`, {})
         .pipe(
            tap(res => {
               const updatedPosts = this.posts().map(post => {
                  if (post.Id === postId) {
                     //post.PostLikes += 1;
                  }
                  return post;
               })
               this.posts.set(updatedPosts)
            })
         )
   }

   deleteLike(postId: number) {
      return this.#http.delete<string>(`${this.baseApiUrl}UnlikePost/${postId}`)
         .pipe(
            tap(res => {
               const updatedPosts = this.posts().map(post => {
                  if (post.Id === postId) {
                     //post.likes -= 1;
                  }
                  return post;
               })
               this.posts.set(updatedPosts)
            })
         )
   }
}