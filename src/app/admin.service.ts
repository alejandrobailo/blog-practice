import { Injectable } from '@angular/core';
import { Post } from './models/post';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  arrPost: Post[];
  newPost: Post;

  changeSb: Subject<Post[]>;
  arrCategory: Post[];

  constructor() {
    this.changeSb = new Subject();
  }

  // Get all:
  getPost() {
    return this.arrPost = JSON.parse(localStorage.getItem('posts'));
  }

  // New post:
  addPost(pPost: Post) {
    this.arrPost.unshift(pPost);
    localStorage.setItem('posts', JSON.stringify(this.arrPost))
  }

  // Filters:
  getFilterPost(event) {
    return this.arrPost.filter(item => item.title.includes(event));
  }

  getFilterCategory(event) {
    if (event != 'All') {
      this.arrCategory = this.arrPost.filter(item => {
        return item.category.toLowerCase() === event.toLowerCase();
      })
    } else {
      this.arrCategory = this.arrPost;
    }
    // Alert on changes
    this.changeSb.next(this.arrCategory);
    console.log(this.arrPost);
  }

  // Delete:
  deletePost(post) {
    this.arrPost.splice(post, 1);
    localStorage.removeItem('posts');
    localStorage.setItem('posts', JSON.stringify(this.arrPost));
  }

  // Obs function to use in blog.ts as subscriber
  postObs(): Observable<Post[]> {
    return this.changeSb.asObservable();
  }
}
