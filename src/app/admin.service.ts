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
    this.arrPost = [
      new Post('Read me', 'You can drag the items, please try it and enjoy, thx.', 'Alex', 'https://image.flaticon.com/icons/svg/1196/1196467.svg', 'All'),
      new Post('Example', 'You can drag me! Move around the screen I am boring', 'Alex', 'https://image.flaticon.com/icons/svg/1196/1196467.svg', 'All')
    ]
    this.changeSb = new Subject();
  }

  // Get all:
  getPost() {
    return this.arrPost = this.arrPost.concat(JSON.parse(localStorage.getItem('posts')));
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
