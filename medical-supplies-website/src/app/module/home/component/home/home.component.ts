import {Component, OnInit} from '@angular/core';
import {ProductMain} from '../../model/product-main';
import {HomeService} from '../../service/home.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsMain: ProductMain[];
  currentPage = 1;
  rfSearch: FormGroup;
  categorys: any;


  constructor(private homeService: HomeService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.rfSearch = new FormGroup({
      productName: new FormControl(''),
      categoryName: new FormControl(''),
      minPrice: new FormControl(''),
      maxPrice: new FormControl(''),
    });
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

  search() {
    let keyword = '?';
    const productName = this.rfSearch.value.productName;
    console.log(`productName: ${productName}`);
    if (productName !== '' && productName != null) {
      keyword += `productName=${productName}&`;
    }
    const categoryName = this.rfSearch.value.categoryName;
    console.log(`categoryName: ${categoryName}`);
    if (categoryName !== '' && categoryName != null) {
      keyword += `categoryName=${categoryName}&`;
    }
    const minPrice = this.rfSearch.value.minPrice;
    console.log(`minPrice: ${minPrice}`);
    if (minPrice !== '' && minPrice != null) {
      keyword += `minPrice=${minPrice}&`;
    }
    const maxPrice = this.rfSearch.value.maxPrice;
    console.log(`maxPrice: ${maxPrice}`);
    if (maxPrice !== '' && maxPrice != null) {
      keyword += `maxPrice=${maxPrice}`;
    }
    console.log(`keyword: ${keyword}`);
    this.homeService.search(keyword).subscribe(next => {
      console.log(next);
      this.rfSearch.reset();
      if (next != null) {
        this.productsMain = next.content;
      } else {
        this.productsMain = [];
      }
    });
  }

}
