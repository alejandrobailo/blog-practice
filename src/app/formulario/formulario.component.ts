import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Post } from '../models/post';
import { ErrorStateMatcher } from '@angular/material/core';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  newPost: Post;

  form: FormGroup;

  constructor(private adminService: AdminService) {

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(35)
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      image: new FormControl('', [
        Validators.required,
      ]),
      author: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      text: new FormControl('', [
        Validators.required,
      ])
    });
  }

  ngOnInit() {

  }

  onSubmit() {
    console.log(this.form.value);
    this.newPost = new Post(this.form.value.title, this.form.value.text, this.form.value.author, this.form.value.image, this.form.value.category)
    this.adminService.addPost(this.newPost);
  }

}
