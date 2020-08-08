import { Component, OnInit, Input } from '@angular/core';
import Stepper from 'bs-stepper';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.sass']
})
export class StepperComponent implements OnInit {

  constructor() { }

  @Input() step: string;
 
  name = 'Angular';
  step1Class
  step2Class
  step3Class
  step4Class
  private stepper: Stepper;

  next() {
    this.stepper.next();
  }

  onSubmit() {
    return false;
  }

  ngOnInit() {
    this.step1Class = this.step == "1"?"step active":"step"
    this.step2Class = this.step == "2"?"step active":"step"
    this.step3Class = this.step == "3"?"step active":"step"
    this.step3Class = this.step == "4"?"step active":"step"

    if(this.step == "2") {
      this.step1Class = "active"
      this.step2Class = "active" 
    }
    
    if(this.step == "3") {
      this.step1Class = "active"
      this.step2Class = "active"
      this.step3Class = "active"
    }
    if(this.step == "4") {
      this.step1Class = "active"
      this.step2Class = "active"
      this.step3Class = "active"
      this.step4Class = "active"
    }
    
  }

}
