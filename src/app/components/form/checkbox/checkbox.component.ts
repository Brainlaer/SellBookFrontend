import { Component, Input } from '@angular/core';

@Component({
  selector: 'br-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.css']
})
export class CheckboxComponent {

  @Input() value!:string;
  @Input() inputId!:string;
  @Input() label!:string;
  @Input() checked!:boolean;

}
