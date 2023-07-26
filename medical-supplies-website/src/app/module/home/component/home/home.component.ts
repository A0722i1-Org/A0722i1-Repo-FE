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
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsMain: ProductMain[];
  // currentPage = 1;
  rfSearch: FormGroup;
  categories: CategoryMain[];
  cart?: Cart;
  details?: CartDetail[];
  page = 0;
  keyword: string;
  totalPages: number[] = [];
  totalPage = 0;
  currentPage = 0;


  constructor(private homeService: HomeService,
              private categoryHomeService: CategoryHomeService,
              private cartService: CartService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(param => {
      this.page = param.page || 1;
      this.currentPage = param.page || 1;
      this.keyword = '?';
      if (this.page !== 0 && this.page != null) {
        this.keyword += `page=${this.page}`;
      }
      console.log('page: ' + this.page);
      console.log('keyword: ' + this.keyword);
    });
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

  getAllProduct() {
    this.homeService.findAll().subscribe((products) => {
        this.productsMain = products.content;
        this.totalPage = products.totalPages;
        this.currentPage = products.number;
        this.totalPages = [];
        for (let j = 0; j < this.totalPage; j++) {
          this.totalPages.push(j);
        }
        console.log(this.productsMain);
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

  search() {
    let keyword = '?';
    const productName = this.rfSearch.value.productName;
    if (productName !== '' && productName != null) {
      keyword += `productName=${productName}`;
    }
    this.homeService.searchByName(keyword).subscribe(next => {
      this.rfSearch.reset();
      if (next != null) {
        this.productsMain = next.content;
      } else {
        this.productsMain = [];
      }
    });
  }

  searchCategory(categoryId: number) {
    this.homeService.searchByCate(categoryId).subscribe(next => {
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

  receiveKeyword($event: string) {
    this.keyword = $event;
    console.log('receive keyword: ' + $event);
  }

  receiveTotalPages($event: number) {
    this.totalPage = $event;
    this.page = 1;
    this.currentPage = 0;
    this.totalPages = [];
    for (let j = 0; j < this.totalPage; j++) {
      this.totalPages.push(j);
    }
  }

  nextPage() {
    this.page++;
    if (this.keyword.includes('page')) {
      console.log('keyword before remove page: ' + this.keyword);
      const pageIndex = this.keyword.indexOf('page=');
      if (pageIndex !== -1) {
        this.keyword = this.keyword.substring(0, pageIndex);
      }
      console.log('keyword after remove page: ' + this.keyword);
    }
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
    console.log('next: ' + this.keyword);
    this.homeService.searchByName(this.keyword).subscribe(next => {
      this.productsMain = next.content;
      this.currentPage = next.number;
    });
  }

  previousPage() {
    this.page--;
    if (this.keyword.includes('page')) {
      console.log('keyword before remove page: ' + this.keyword);
      const pageIndex = this.keyword.indexOf('page=');
      if (pageIndex !== -1) {
        this.keyword = this.keyword.substring(0, pageIndex);
      }
      console.log('keyword after remove page: ' + this.keyword);
    }
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
    console.log('previous: ' + this.keyword);
    this.homeService.searchByName(this.keyword).subscribe(next => {
      this.productsMain = next.content;
      this.currentPage = next.number;
    });
  }

  accessPage(page: number) {
    this.page = page;
    if (this.keyword.includes('page')) {
      console.log('keyword before remove page: ' + this.keyword);
      const pageIndex = this.keyword.indexOf('page=');
      if (pageIndex !== -1) {
        this.keyword = this.keyword.substring(0, pageIndex);
      }
      console.log('keyword after remove page: ' + this.keyword);
    }
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
    console.log(this.keyword);
    this.homeService.searchByName(this.keyword).subscribe(next => {
      this.productsMain = next.content;
      this.currentPage = next.number;
    });
  }
}
