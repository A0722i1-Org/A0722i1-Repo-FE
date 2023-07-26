import {Component, OnInit} from '@angular/core';
import {ProductMain} from '../../model/product-main';
import {HomeService} from '../../service/home.service';
import {CartService} from '../../../cart/service/cart.service';
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

  getAllProduct(): any {
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
    let flag = false;
    this.details.forEach(value => {
      if (value.product.productId === productId) {
        flag = true;
      }
    });
    if (flag) {
      Swal.fire('Lưu ý',
        'Sản phẩm đã có trong giỏ',
        'info');
    } else {
      this.cartService.addToCart(productId).subscribe(next => {
        Swal.fire('Thành công',
          'Đã thêm sản phẩm vào giỏ',
          'success');
      });
    }
  }
}
