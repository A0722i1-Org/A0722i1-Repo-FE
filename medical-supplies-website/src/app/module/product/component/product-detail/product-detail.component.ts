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
  images: string[] = [
    '../../../../../assets/images/khautrang.png',
    '../../../../../assets/images/khautrang2.png',
    '../../../../../assets/images/khautrang3.png',
    '../../../../../assets/images/khautrang4.png'
  ];

  id: number;
  products: Product[] = [];
  productViewDetail: Product = {
    productInfo: {}
  };
  productDetail: FormGroup;
  quantity = 1;
  role: string;

  @ViewChild('quantityInput', {static: true}) quantityInput: ElementRef<HTMLInputElement>;

  constructor(private productService: ProductService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.getAll();
    this.role = this.tokenStorageService.getRole();
  }

  getAll() {
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.id = +paramMap.get('id');
      this.productService.findByIdProductDetail(this.id).subscribe((productData) => {
        console.log(productData);
        this.productViewDetail = productData;
        this.quantity = this.productViewDetail.productQuantity || 1;
        this.quantityInput.nativeElement.value = this.quantity.toString();
        this.initProductDetailForm(productData);
      });
    });
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

  increaseQuantity(): void {
    const maxValue = 100;
    if (this.quantity < maxValue) {
      this.quantity++;
      this.quantityInput.nativeElement.value = this.quantity.toString();
    }
  }

  decreaseQuantity(): void {
    const minValue = 1;
    if (this.quantity > minValue) {
      this.quantity--;
      this.quantityInput.nativeElement.value = this.quantity.toString();
    }
  }

  addToCart(): void {
    const cartItem: Product = {
      productId: this.productViewDetail.productId,
      productImg: this.productViewDetail.productImg,
      productName: this.productViewDetail.productName,
      productPrice: this.productViewDetail.productPrice,
      productQuantity: this.quantity,
    };
    this.productService.addToCart(cartItem);
    Swal.fire('Thành công',
      'Đã thêm sản phẩm vào giỏ hàng',
      'success');
    this.router.navigateByUrl('/carts');
  }
}
