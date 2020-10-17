import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  firstName: string;
  lastName: string;
  constructor() { }

  ngOnInit() {
    this.firstName = 'Alec';
    this.lastName = 'Thompson';
  }

}
