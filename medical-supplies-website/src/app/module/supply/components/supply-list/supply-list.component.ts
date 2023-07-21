import { Component, OnInit } from '@angular/core';
import {Supply} from "../../model/Supply";
import {SupplyService} from "../../service/supply.service";

@Component({
  selector: 'app-supply-list',
  templateUrl: './supply-list.component.html',
  styleUrls: ['./supply-list.component.css']
})
export class SupplyListComponent implements OnInit {
  supplies: Supply[] = [];


  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.supplyService.getAll().subscribe(data => {
      this.supplies = data.content;
    })
  }

  constructor(private supplyService: SupplyService) {
  }

  search($event: Supply[]) {
    this.supplies = $event;
  }
}
