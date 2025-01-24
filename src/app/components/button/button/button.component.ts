import { Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { iconPosType } from '../../enums/icon';
import { severityEnum } from '../../enums/severity';
import { variantEnum } from '../../enums/variant';
import { sizeEnum } from '../../enums/size';

@Component({
  selector: 'br-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css', '../../brStyles.css']
})
export class ButtonComponent implements OnInit {
  @Input() label!: string;

  @Input() icon!: string;
  @Input() iconPos!: iconPosType;

  @Input() severity: severityEnum='primary';
  @Input() loading!: boolean;
  @Input() raiced!: boolean;
  @Input() disabled!: boolean;
  @Input() rounded!: boolean;
  @Input() variant!: variantEnum;
  @Input() badge!: number;
  @Input() badgeSeverity!: severityEnum;
  @Input() size!: sizeEnum;
  @Output() onClick!:EventEmitter<any>;

  class: string = `br-button ${this.severity} `;
  constructor(    
  ){}

  ngOnInit(): void {
    if(this.iconPos=='bottom'||this.iconPos=='top'){
      this.class=this.class+' br-button-vertical'
      if(this.iconPos=='bottom'){
        this.class=this.class+' br-button-reversal'

      }
    }
  }




}
