import { Component, OnInit } from '@angular/core';
import {Supply} from '../../model/Supply';
import {SupplyService} from '../../service/supply.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css']
})
export class SupplyListComponent implements OnInit {
  supplies: Supply[] = [];
  page = 0;
  keyword: string;

  totalPages: number[] = [];
  totalPage = 0;
  currentPage = 0;

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.supplyService.search(this.keyword).subscribe(data => {
      this.supplies = data.content;
      this.totalPage = data.totalPages;
      this.currentPage = data.number;
      for (let j = 0; j < this.totalPage; j++) {
        this.totalPages.push(j);
      }
      console.log(this.supplies);
    });
  }

  constructor(private supplyService: SupplyService, private route: ActivatedRoute) {
    this.route.queryParams.subscribe(param => {
      this.page = param.page || 1;
      this.currentPage = param.page || 1;
      this.keyword = '?';
      if (this.page !== 0 && this.page != null) {
        this.keyword += `page=${this.page}`;
      }
      // this.keyword = `?page=${this.page}`;
      console.log('page: ' + this.page);
      console.log('keyword: ' + this.keyword);

    });
  }

  search($event: Supply[]) {
    this.supplies = $event;
  }


  nextPage() {
    this.page++;
    this.keyword = '?';
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
    console.log('next: ' + this.keyword);
    this.supplyService.search(this.keyword).subscribe(next => {
      this.supplies = next.content;
      this.currentPage = next.number;
    });
  }

  previousPage() {
    this.page--;
    this.keyword = '?';
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
    console.log('previous: ' + this.keyword);
    this.supplyService.search(this.keyword).subscribe(next => {
      this.supplies = next.content;
      this.currentPage = next.number;
    });
  }

  accessPage(page: number) {
    this.page = page;
    this.keyword = '?';
    if (this.page !== 0 && this.page != null) {
      this.keyword += `page=${this.page}`;
    }
    console.log(this.keyword);
    this.supplyService.search(this.keyword).subscribe(next => {
      this.supplies = next.content;
      this.currentPage = next.number;
    });
  }

}
