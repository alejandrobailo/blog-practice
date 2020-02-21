import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Post } from '../models/post';
import { Router } from '@angular/router';

interface Categories {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  form: FormGroup;
  newPost: Post;
  //
  selectedValue: string;

  categories: Categories[] = [
    { value: 'Travel', viewValue: 'Travel' },
    { value: 'Food', viewValue: 'Food' }
  ];

  constructor(private adminService: AdminService, private routerActive: Router) {

    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.maxLength(35),
        Validators.minLength(3)
      ]),
      category: new FormControl('', [
        Validators.required,
        Validators.maxLength(15)
      ]),
      image: new FormControl('', [
        Validators.required,
        Validators.pattern(/(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/)
      ]),
      author: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
        Validators.minLength(3)
      ]),
      text: new FormControl('', [
        Validators.required,
        Validators.minLength(15)
      ])
    });
  }

  onSubmit() {
    this.newPost = new Post(this.form.value.title, this.form.value.text, this.form.value.author, this.form.value.image, this.form.value.category)
    this.adminService.addPost(this.newPost);
    //1s Delay at post.
    setTimeout(async () => {
      await this.routerActive.navigate(['blog'])
    }, 1000)
  }

  ngOnInit() {
  }

}
