import { Component, OnInit, Input } from '@angular/core';
import { AdminService } from '../admin.service';
import { Post } from '../models/post';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title" style="color: tomato">{{post.title}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p style="color: #aaa">Write by {{post.author}} on {{post.date | date: 'dd/MM/yyyy'}}</p>
      <img style="max-height: 200px; width: 100%; margin-bottom: 1em" [src]="post.image">
      <p>{{post.text}}!</p>
    </div>
    <div class="modal-footer">
      <p style="color: #aaa">Category {{post.category}}</p>
    </div>
  `
})
export class NgbdModalContent {
  // Get post as input to paint it:
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

  // Modal window:
  open(i) {
    const modalRef = this.modalService.open(NgbdModalContent);
    modalRef.componentInstance.post = this.postList[i];
  }

  //

  ngOnInit() {
    this.postList = this.adminService.getPost();
    // Subscription changes:
    this.adminService.postObs().subscribe(() => {
      this.postList = this.adminService.arrCategory;
    })
  }

  handleInput($event) {
    this.postList = this.adminService.getFilterPost($event.target.value);
  }

  handleClick(post) {
    this.adminService.deletePost(post);
    this.postList = this.adminService.getPost();
  }

}
