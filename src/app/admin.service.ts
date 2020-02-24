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
      new Post('Example', 'You can drag me! Move me around the screen, I am boring.', 'Alex', 'https://image.flaticon.com/icons/svg/1196/1196467.svg', 'All')
    ]
    this.changeSb = new Subject();
  }

  // Get all:
  getPost(): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      // If there is anything in local storage do it
      if (JSON.parse(localStorage.getItem('posts')) != null) {
        for (const post of JSON.parse(localStorage.getItem('posts'))) {
          // If the post does not repeat get it
          if (this.arrPost.some(item => item.title == post.title)) {
            this.arrPost;
          } else {
            this.arrPost = this.arrPost.concat(post)
          }
        }
        resolve(this.arrPost);
      } else resolve(this.arrPost);
    })
  }

  // New post:
  addPost(pPost: Post): Promise<Post[]> {
    return new Promise<Post[]>((resolve, reject) => {
      this.arrPost.unshift(pPost);
      localStorage.setItem('posts', JSON.stringify(this.arrPost))
      resolve(this.arrPost);
    })
  }

  // Filters:
  getFilterPost(event) {
    return this.arrPost.filter(item => item.title.toLowerCase().includes(event));
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
