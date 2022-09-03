import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';

import { ComplexValidators } from '../global/complex-validators';

@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html', 
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {

  feedbackForm: FormGroup; // Declaring a variable of type FormGroup
  morefeedbacksControls: FormArray;
  customerNameChanged: boolean = false;
  customerNameControl:any;

  constructor(private formBuilder: FormBuilder) {
    this.buildFeedbackForm();
  }

  ngOnInit(): void {
    // Set default values in fcdorm only after ng on init
    // let customerNameControl = this.feedbackForm.get('customerName') as FormControl;
    
  }

  // Object selection item for select dropdowns
  

  buildFeedbackForm() {
    // Building the Feedback Form Group
    this.feedbackForm = this.formBuilder.group({
      // customerName: new FormControl() // arguments: val, validator
      customerName: this.formBuilder.control(null, [Validators.required, Validators.minLength(6)]), // same as above but expects null by default
      cuttingdesign: this.formBuilder.control(null),
      // productPurchased: this.formBuilder.control('Washing Machine'), // default value setting
      suggestions: this.formBuilder.control(null),
      ShavingQuality: this.formBuilder.group({
        OnTime: this.formBuilder.control(null),
        // delOnTime: this.formBuilder.control(true), // default value setting
        damagedProduct: this.formBuilder.control(null),
        extraCharge: this.formBuilder.control(null)
      }),
      TreamingQuality: this.formBuilder.group({
        properTream: this.formBuilder.control(null),
        easyTream: this.formBuilder.control(null),
        worstTream: this.formBuilder.control(null)
      }),
      faceWashingQuality: this.formBuilder.group({
        SmoothfaceWashing: this.formBuilder.control(null),
        roughFacewashing: this.formBuilder.control(null),
        otherIssues: this.formBuilder.control(null)
      }), // Nested Form Group
      gender: this.formBuilder.control(null),
      // gender: this.formBuilder.control('Male'), // default value setting
      cuttingQuality: this.formBuilder.control(null), // Radio buttons - formcontrol
      morefeedbacks: this.formBuilder.array([
        this.formBuilder.control(null)
      ]) // Form array for dynamic form elements
    },
      {
        validator: ComplexValidators.checkRelation('cuttingdesign', 'cuttingQuality')
      }); // Form Builder uses a group of form controls to create a Form Group

    // Building the FormArray Control
    this.morefeedbacksControls = this.feedbackForm.get('morefeedbacks') as FormArray;

    // Creating customer name control
    this.customerNameControl = this.feedbackForm.get('customerName');

    // Subscribe to valueChanges event for customer Name
    this.customerNameControl.valueChanges.subscribe((data:any) => {
      this.customerNameChanged = data && data.toUpperCase().trim() === "TESTING";
    });


  }

  addMoreFeedback() {
    this.morefeedbacksControls.push(this.formBuilder.control(null));
  }

  deleteMoreFeedback(index:any) {
    this.morefeedbacksControls.removeAt(index);
  }

  clearForm() {
    /*this.feedbackForm.reset({
      customerName: 'Kiran Kumar Dash' // Default name on clearing out form
    });*/
    this.feedbackForm.reset(); // Resets the formgroup
  }

  submitFeedbackForm() {
    console.log(this.feedbackForm.value);
  }

}