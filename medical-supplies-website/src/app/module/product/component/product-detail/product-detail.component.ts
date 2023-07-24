import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ProductInfoService} from '../../service/product-info.service';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ProductInfo} from "../../model/ProductInfo";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedImage: string;
  images: string[] = [
    '../../../../../assets/images/khautrang.png',
    '../../../../../assets/images/khautrang2.png',
    '../../../../../assets/images/khautrang3.png',
    '../../../../../assets/images/khautrang4.png'
  ];
  id: number;
  productInfos: ProductInfo[] = [];
  productDetail: FormGroup;

  constructor(private productService: ProductService,
              private productInfoService: ProductInfoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
  }

  getAll() {
    this.productInfoService.getAllProductInfo().subscribe((data) => {
      this.productInfos = data;
    });

    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.productService.findByIdProduct(this.id).subscribe((productDetail) => {
        this.productDetail
      })
    })
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
}
