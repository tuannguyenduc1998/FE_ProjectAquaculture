import { Component, OnInit, ViewChild } from '@angular/core';
import {Location} from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { ETypeForm } from 'src/app/shared/enum/type-form';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  @ViewChild('form') form: UserFormComponent;
  typeForm: string;
  etypeForm = ETypeForm;
  constructor(private location: Location) { }

  ngOnInit(): void {
    this.typeForm = this.etypeForm.create;
  }

  goBack(): void {
    this.location.back();
  }

}
