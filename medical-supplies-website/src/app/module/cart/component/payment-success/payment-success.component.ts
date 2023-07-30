import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '../../service/payment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  totalAmount: number;
  txnRef: string;

  constructor(private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router) {
    this.activatedRoute.queryParams.subscribe(params => {
      this.totalAmount = params['vnp_Amount'];
      this.txnRef = params['vnp_TxnRef'];
      this.paymentService.transactionSuccess(this.txnRef).subscribe();
      debugger;
      this.alertAndNavigate();
    });
  }

  ngOnInit(): void {
  }

  alertAndNavigate() {
    let timerInterval;
    Swal.fire({
      title: 'Thanh toán thành công',
      html: 'Đang chuyển về trang chủ',
      timer: 3000,
      timerProgressBar: true,
      didOpen: () => {
        Swal.showLoading();
        // const b = Swal.getHtmlContainer().querySelector('b');
        // timerInterval = setInterval(() => {
        //   b.textContent = String(Swal.getTimerLeft() / 1000);
        // }, 1000);
      },
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      this.router.navigateByUrl('');
    });
  }
}
