import {Component, OnInit} from '@angular/core';
import {ProductMain} from '../../model/product-main';
import {HomeService} from '../../service/home.service';
import {CartService} from '../../../cart/service/cart.service';
import {CartWithDetail} from '../../../cart/model/cart-with-detail';
import {Observable} from 'rxjs';
import {Cart} from '../../../cart/model/Cart';
import {CartDetail} from '../../../cart/model/CartDetail';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsMain: ProductMain[];
  currentPage = 1;
  cart?: Cart;
  details?: CartDetail[];

  constructor(private homeService: HomeService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getCart();
  }

  getAllProduct() {
    this.homeService.findAll(this.currentPage).subscribe((products) => {
        this.productsMain = products.content;
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
    this.getAllProduct();
  }

  previousPage() {
    this.currentPage = this.currentPage - 1;
    this.getAllProduct();
  }

  pageOne() {
    this.currentPage = 1;
    this.getAllProduct();
  }

  pageTwo() {
    this.currentPage = 2;
    this.getAllProduct();
  }

  pageThree() {
    this.currentPage = 3;
    this.getAllProduct();
  }

  getCart() {
    return this.cartService.getCart().subscribe(next => {
      this.cart = next.cart;
      this.details = next.cartDetailList;
    });
  }

  addToCart(productId: number) {
    this.cartService.addToCart(productId).subscribe(next => {
      Swal.fire('Thành công',
        'Đã thêm sản phẩm vào giỏ',
        'success');
    });
  }
}
