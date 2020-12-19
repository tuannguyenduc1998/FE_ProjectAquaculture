import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ETypeForm } from 'src/app/shared/enum/type-form';
import {Location} from '@angular/common';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {
  id: string;
  typeForm: string;
  etypeForm = ETypeForm;
  constructor(private router: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
    this.typeForm = this.etypeForm.edit;
  }

  goBack(): void {
    this.location.back();
  }

}
