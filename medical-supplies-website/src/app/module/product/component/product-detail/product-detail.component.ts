import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {Product} from '../../model/Product';
import Swal from 'sweetalert2';
import {TokenStorageService} from '../../../security/service/token-storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  selectedImage: string;
  id: number;
  products: Product[] = [];
  productViewDetail: Product = {
    productInfo: {}
  };
  productDetail: FormGroup;
  role = '';

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.getRole();
  }

  getAll() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.productService.findByIdProductDetail(this.id).subscribe((productData) => {
        this.productViewDetail = productData;
        this.initProductDetailForm(productData);
      });
    });
  }

  getRole() {
    this.role = this.tokenStorageService.getRole();
  }

  private initProductDetailForm(productData: Product) {
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

  addToCart(): void {
    this.productService.addToCart(this.id);
    Swal.fire('Thành công',
      'Đã thêm sản phẩm vào giỏ hàng',
      'success');
    this.router.navigateByUrl('/carts');
  }
}
