import { SharedService } from './../../services/shared.service';
import { Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Input() products: any = [];
  @ViewChildren("subTotalWrap") subTotalItems: QueryList<ElementRef>;

  public singleProduct;
  public isAdded;
  public savedArray;
  constructor(   private renderer: Renderer2,
    public mySharedService: SharedService) { }

  ngOnInit(): void {
    this.isAdded = new Array(this.products.length);
    this.isAdded.fill(false, 0, this.products.length);
    console.log('this.isAdded -> ', this.isAdded, this.products);

    this.mySharedService.getProducts().subscribe(data => {

      if (data && data.length > 0) {

      } else {
        this.products.map((item, index) => {
          this.isAdded[index] = false;
        });
      }

    });
  }

  // Add item in cart on Button click
  // ===============================

  addToCart(event, productId, product) {

    // Change button color to green
    this.products.map((item, index) => {
      if (item.id === productId) {
        this.isAdded[index] = true;
      }
    })

    this.mySharedService.addProductToCart({
      ...product,
      qty: 1
    });
  }


  changeSubtotal(product,index)
  {
    const qty = product.qtyTotal;
    const amt = product.variationCost;
    const subTotal = amt * qty;

    this.subTotalItems.toArray()[index].nativeElement.innerHTML ;
  }
  checkIfProductAddedToCart(product) {
    return this.mySharedService.isProductAdded(product);
  }
  getProductIndex(product) {
    return this.mySharedService.getAddedProductIndex(product);
  }
  onValueChange() {
    this.mySharedService.updateProductInLocalStorage();
  }
}
