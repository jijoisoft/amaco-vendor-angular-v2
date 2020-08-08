import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reviews-summary',
  templateUrl: './reviews-summary.component.html',
  styleUrls: ['./reviews-summary.component.sass']
})
export class ReviewsSummaryComponent implements OnInit {
  readonly = true 
  max = 5  
  one = 1
  two = 2
  three = 3
  four = 4
  five = 5
  @Input() summary: any
  constructor() { }

  ngOnInit(): void {
  }

}
