import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];

  constructor(private formBuilder: FormBuilder) {

  }
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email])
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges.subscribe(
      (value) => {
        console.log(value);
      }
    );
    this.signupForm.statusChanges.subscribe(
      (status) => {
        console.log(status);
      }
    );
    this.signupForm.setValue({
      'userData' : {
        'username' : 'Max',
        'email' : 'test@123.gr'
      },
      'gender' : 'male',
      'hobbies': []
    });
  }
  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset();
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
      return { 'nameIsForbidden': true };
    }
    return null;
  }
}
