import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  // Local variable which stores
  public cartItems = [];
  public products = new Subject();
  public showCart = false;
  constructor() { 
    const items  = []
    try {
      items.push(...JSON.parse(localStorage.getItem('cart_items')));
    } catch(er) {
    }
    this.cartItems.push(...items);
    if (this.cartItems.length > 0) {
      this.showCart = true;
    }
  }

  updateProductInLocalStorage() {
    localStorage.setItem('cart_items',JSON.stringify(this.cartItems));
  }
  getProducts(): Observable<any> {
    console.log('this.cartItems :', this.cartItems);
    return this.products.asObservable();
  }

  setProducts(products) {
    this.cartItems.push(...products);
    this.products.next(products);
  }

  // Add single product to the cart
  addProductToCart(product) {
    this.cartItems.push(product);
    this.products.next(this.cartItems);
    this.updateProductInLocalStorage();
  }

  // Remove single product from the cart
  removeProductFromCart(productId) {
    this.cartItems.map((item, index) => {
      if (item.id === productId) {
        this.cartItems.splice(index, 1);
      }
    });
    // Update Observable value
    this.products.next(this.cartItems);
    this.updateProductInLocalStorage();
  }

  // Remove all the items added to the cart
  emptryCart() {
    this.cartItems.length = 0;
    this.products.next(this.cartItems);
    this.updateProductInLocalStorage();
  }

  // Calculate total price on item added to the cart
  getTotalPrice() {
    return this.cartItems.map(item => item.price * item.qty).reduce((prv, nxt) => prv+nxt);
  }

  isProductAdded(product) {
    const filter = this.cartItems.filter(e => e.id == product.id);
    if (filter.length == 0) return false;
    return true;
  }
  getAddedProductIndex(product) {
    const indx = this.cartItems.findIndex(e => e.id == product.id);
    return indx;
  }
}
