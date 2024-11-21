import { Component, Input } from '@angular/core';

@Component({
  selector: 'br-label-input',
  templateUrl: './label-input.component.html',
  styleUrls: ['./label-input.component.css']
})
export class LabelInputComponent {

  @Input() disabled:boolean=false;
  @Input() placeholder:string='';
  @Input() label:string='';

}
