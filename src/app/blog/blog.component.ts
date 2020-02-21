import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { Post } from '../models/post';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">{{post.title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Write by {{post.author}}</p>
      <p>{{post.text}}!</p>
    </div>
    <div class="modal-footer">
      <p>Category "{{post.category}}"</p>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() post;

  constructor(public activeModal: NgbActiveModal) { }
}

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})

export class BlogComponent implements OnInit {

  postList: Post[];

  constructor(private adminService: AdminService, private modalService: NgbModal) {
  }

  open(i) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.post = this.postList[i];
  }
  ////
  ngOnInit() {
    this.postList = this.adminService.getPost();
    console.log(this.postList);
  }

  handleInput($event) {
    this.postList = this.adminService.getFilterPost($event.target.value);
  }

  handleClick(post) {
    this.adminService.deletePost(post);
    console.log(post);
    this.postList = this.adminService.getPost();
  }

}
