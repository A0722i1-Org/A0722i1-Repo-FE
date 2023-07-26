import {Component, OnInit} from '@angular/core';
import {ProductMain} from '../../model/product-main';
import {HomeService} from '../../service/home.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryHomeService} from '../../service/category-home.service';
import {CategoryMain} from '../../model/category-main';
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
  rfSearch: FormGroup;
  categories: CategoryMain[];
  cart?: Cart;
  details?: CartDetail[];


  constructor(private homeService: HomeService,
              private categoryHomeService: CategoryHomeService,
              private cartService: CartService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
    this.rfSearch = new FormGroup({
      productName: new FormControl(''),
      categoryName: new FormControl(''),
    });
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

  getAllCategory() {
    this.categoryHomeService.getCategories().subscribe((data) => {
        this.categories = data;
      },
      error => {
        console.error('Error fetching category:', error);
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

  search() {
    let keyword = '';
    const productName = this.rfSearch.value.productName;
    if (productName !== '' && productName != null) {
      keyword += `productName=${productName}`;
    }
    this.homeService.searchByName(keyword, this.currentPage).subscribe(next => {
      this.rfSearch.reset();
      if (next != null) {
        this.productsMain = next.content;
      } else {
        this.productsMain = [];
      }
    });
  }

  searchCategory(categoryId: number) {
    this.homeService.searchByCate(categoryId, this.currentPage).subscribe(next => {
      if (next != null) {
        this.productsMain = next.content;
      } else {
        this.productsMain = [];
      }
    });
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
