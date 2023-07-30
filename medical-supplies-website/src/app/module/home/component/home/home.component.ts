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
import {ActivatedRoute} from '@angular/router';
import {TokenStorageService} from '../../../security/service/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsMain: ProductMain[];
  rfSearch: FormGroup;
  categories: CategoryMain[];
  cart?: Cart;
  details?: CartDetail[];
  page = 0;
  keyword: string;
  totalPages: number[] = [];
  totalPage = 0;
  currentPage = 0;
  role = '';


  constructor(private homeService: HomeService,
              private categoryHomeService: CategoryHomeService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService) {
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
    if (this.loadRole() === 'ROLE_USER') {
      this.getCart();
    }
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
      this.activeCategories(0);
    });
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
    this.activeCategories(0);
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
    this.activeCategories(categoryId);
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
      this.cartService.addToCart(productId).subscribe(next => {
        Swal.fire('Thành công',
          'Đã thêm sản phẩm vào giỏ',
          'success');
      });
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
      const pageIndex = this.keyword.indexOf('page=');
      if (pageIndex !== -1) {
        this.keyword = this.keyword.substring(0, pageIndex);
      }
    }
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
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

  /*
  * Author: NhatLH
  * Created: 2023-07-27
  * */
  loadRole(): string {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getRole();
    }
    return this.role;
  }

  activeCategories(categoryId: number) {
    const categoryElements = document.getElementsByClassName('category__item');
    const categories = Array.from(categoryElements);
    if (categories.length > 0) {
      for (const element of categories) {
        if (element.className.includes('active')) {
          element.classList.remove('active');
        }
      }
    }
    document.getElementById(`category__item-${categoryId}`).classList.add('active');
  }
}
