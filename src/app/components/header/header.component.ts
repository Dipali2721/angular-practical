import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public cartProductCount: number = 0;
  constructor( public mySharedService: SharedService) { }

  ngOnInit(): void {
  }
  changeCartVisibility() {
    if (this.mySharedService.cartItems.length == 0) return;
    this.mySharedService.showCart = !this.mySharedService.showCart;
  }
}
