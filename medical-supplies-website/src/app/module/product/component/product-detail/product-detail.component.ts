import {Component, OnInit} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ProductInfoService} from '../../service/product-info.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {ProductInfo} from '../../model/ProductInfo';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../model/Product';

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
  products: Product[] = [];
  productInfos: ProductInfo[] = [];
  productViewDetail: Product = {
    productInfo: {}
  };
  productDetail: FormGroup;

  constructor(private productService: ProductService,
              private productInfoService: ProductInfoService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.productService.findByIdProductDetail(this.id).subscribe((productData) => {
        this.productViewDetail = productData;
        this.initProductForm(productData);
      });
    });
    console.log(this.productService.findByIdProductDetail(this.id));
  }

  private initProductForm(productData: Product) {
    this.productDetail = new FormGroup({
      productId: new FormControl(productData.productId),
      productName: new FormControl(productData.productName),
      productPrice: new FormControl(productData.productPrice),
      productQuantity: new FormControl(productData.productQuantity),
      productImg: new FormControl(productData.productImg),
      productInfo: new FormControl(productData.productInfo),
    });
  }

  selectImage(image: string) {
    this.selectedImage = image;
  }
}
