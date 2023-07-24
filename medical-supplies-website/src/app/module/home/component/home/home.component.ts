import {Component, OnInit} from '@angular/core';
import {ProductMain} from '../../model/product-main';
import {HomeService} from '../../service/home.service';
import {FormControl, FormGroup} from '@angular/forms';
import {CategoryHomeService} from '../../service/category-home.service';
import {CategoryMain} from '../../model/category-main';

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


  constructor(private homeService: HomeService,
              private categoryHomeService: CategoryHomeService) {
  }

  ngOnInit(): void {
    this.getAllProduct();
    this.getAllCategory();
    this.rfSearch = new FormGroup({
      productName: new FormControl(''),
      categoryName: new FormControl(''),
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

}
