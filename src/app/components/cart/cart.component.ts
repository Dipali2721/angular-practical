import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  public cartItems;
  public totalAmmount;
  constructor(public mySharedService: SharedService) { }
  ngOnInit(): void {
  }

   // Remove item from cart list
   removeItemFromCart(productId) {
    this.mySharedService.removeProductFromCart(productId);
  }

  emptyCart() {
    this.mySharedService.emptryCart();
  }
  get isCartShow() {
    const checkIfCartHasItems = this.mySharedService.cartItems && this.mySharedService.cartItems.length > 0;
    if (!checkIfCartHasItems) return false;
    return this.mySharedService.showCart;
  }
}
