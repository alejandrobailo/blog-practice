import { Component } from '@angular/core';
import { AdminService } from './admin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private adminService: AdminService) { }

  ngOnInit() { }

  handleClick(event) {
    return this.adminService.getFilterCategory(event.target.textContent);
  }
}
