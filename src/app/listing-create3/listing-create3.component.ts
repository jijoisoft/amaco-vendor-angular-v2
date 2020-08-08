import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { ValidatorFn, AbstractControl } from '@angular/forms';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-listing-create3',
  templateUrl: './listing-create3.component.html',
  styleUrls: ['./listing-create3.component.sass']
})

export class ListingCreate3Component implements OnInit {

  plusIcon = faPlus

  dynamicForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }



  get f() { return this.dynamicForm.controls; }
  get t() { return this.f.tickets as FormArray; }

  

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dynamicForm.invalid) {
      return;
    }

    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.dynamicForm.value, null, 4));
  }

  onReset() {
    // reset whole form back to initial state
    this.submitted = false;
    this.dynamicForm.reset();
    this.t.clear();
  }

  onClear() {
    // clear errors and reset ticket fields
    this.submitted = false;
    this.t.reset();
  }
  addAttachment() {
    this.t.push(this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required]]
    }));

    console.log("Incremented")

  }
  ngOnInit(): void {
    this.dynamicForm = this.formBuilder.group({
      numberOfTickets: ['', Validators.required],
      tickets: new FormArray([])
    });
    this.addAttachment()
  }

}
