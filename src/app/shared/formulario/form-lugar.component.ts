import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'shared-form-lugar',
  templateUrl: './form-lugar.component.html',
  styleUrls: ['./form-lugar.component.scss']
})
export class FormLugarComponent implements OnInit {
  @Input("lugar") public lugar: FormGroup;
  @Input("localidades") public localidades: any;
  @Input("submitted") public submitted: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
