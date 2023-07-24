
import {Component, OnInit} from '@angular/core';
import {CartWithDetail} from '../../model/cart-with-detail';
import {CartService} from '../../service/cart.service';
import {Cart} from '../../model/Cart';
import {CartDetail} from '../../model/CartDetail';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  rf: FormGroup;
  cart?: Cart;
  details?: CartDetail[];
  total = 0;
  shippingFee = 0;
  displayPaypal: string;
  displayCheckout: string;

  constructor(private cartService: CartService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getCart();
    this.displayPaypal = 'none';
    this.displayCheckout = 'inline';
  }

  getTotalAmount() {
    let temp = 0;
    this.details.forEach(item => {
      if (item.status === true) {
        temp += item.quantity * item.product.productPrice;
      }
    });
    this.total = temp;
  }

  getCart() {
    this.cartService.getCart().subscribe(next => {
      this.cart = next.cart;
      this.details = next.cartDetailList;
      this.formBuilder();
    }, error => alert('Lỗi rồi đó'));
  }

  decreaseQuantity(cartDetailId: number) {
    const tempCartDetails: CartDetail[] = [];
    this.details.forEach(next => {
      if (next.cartDetailId === cartDetailId) {
        if (next.quantity > 0) {
          next.quantity--;
        }
      }
      tempCartDetails.push(next);
    });
    this.details = tempCartDetails;
    this.getTotalAmount();
  }

  increaseQuantity(cartDetailId: number) {
    const tempCartDetails: CartDetail[] = [];
    this.details.forEach(next => {
      if (next.cartDetailId === cartDetailId) {
        next.quantity++;
      }
      tempCartDetails.push(next);
    });
    this.details = tempCartDetails;
    this.getTotalAmount();
  }

  checkAll() {
    const tempCartDetails: CartDetail[] = [];
    this.details.forEach(item => {
      item.status = true;
      tempCartDetails.push(item);
    });
    this.details = tempCartDetails;
    this.getTotalAmount();
  }

  uncheckAll() {
    const tempCartDetails: CartDetail[] = [];
    this.details.forEach(item => {
      item.status = false;
      tempCartDetails.push(item);
    });
    this.details = tempCartDetails;
    this.getTotalAmount();
  }

  formBuilder() {
    this.rf = new FormGroup({
      receiverName: new FormControl(this.cart.receiverName, [Validators.required, Validators.pattern('^([^0-9]*)$')]),
      receiverAddress: new FormControl(this.cart.receiverAddress, [Validators.required]),
      receiverPhone: new FormControl(this.cart.receiverPhone, [Validators.required, Validators.pattern('^0\\d{9,10}')]),
      receiverEmail: new FormControl(this.cart.receiverEmail, [Validators.required, Validators.email])
    });
  }

  save() {
    this.uncheckAll();
    this.cartService.updateCart(this.prepareCartForSendingToBackend()).subscribe(next =>
      Swal.fire({
        title: 'Đã huỷ!',
        text: 'Đã huỷ thao tác, quay về trang chính',
        icon: 'info',
        confirmButtonText: 'Cool'
      }));
    this.router.navigateByUrl('/');
  }

  checkout() {
    this.cartService.checkout(this.prepareCartForSendingToBackend()).subscribe(next =>
      Swal.fire({
        title: 'Thành công!',
        text: 'Đã đặt hàng thành công, quay về trang chính',
        icon: 'success',
        confirmButtonText: 'Cool'
      }));
    this.router.navigateByUrl('/');
  }

  prepareCartForSendingToBackend(): CartWithDetail {
    this.cart.receiverName = this.rf.value.receiverName;
    this.cart.receiverAddress = this.rf.value.receiverAddress;
    this.cart.receiverPhone = this.rf.value.receiverPhone;
    this.cart.receiverEmail = this.rf.value.receiverEmail;
    const cartWithDetail: CartWithDetail = {cart: this.cart, cartDetailList: this.details};
    cartWithDetail.cartDetailList = this.details;
    cartWithDetail.cart = this.cart;
    return cartWithDetail;
  }

  showPaypalButton() {
    this.displayPaypal = 'inline';
    this.displayCheckout = 'none';
  }

  showCheckoutButton() {
    this.displayPaypal = 'none';
    this.displayCheckout = 'inline';
  }
}
