import { Injectable } from '@angular/core';
import { Post } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  arrPost: Post[];
  newPost: Post;

  constructor() {
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

  // Filter:
  getFilterPost(event) {
    return this.arrPost.filter(item => item.title.includes(event));
  }

  // Delete:
  deletePost(post) {
    this.arrPost.splice(post, 1);
    localStorage.removeItem('posts');
    localStorage.setItem('posts', JSON.stringify(this.arrPost));
  }
}
