import { MainService } from './services/main.service';
import { SharedService } from './services/shared.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'practicaltest';
  products: any = [];


  constructor(
    private myMainService: MainService,
    private mySharedService: SharedService
  ) { }

  ngOnInit() {
    // Get all product list on component init
    this.myMainService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

}
