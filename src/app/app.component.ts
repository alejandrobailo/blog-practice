import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private routerActive: Router, private adminService: AdminService) {

  }
}
