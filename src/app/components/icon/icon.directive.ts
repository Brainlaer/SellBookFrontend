import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { iconSeverity } from './Icon';

@Directive({
  selector: '[brIcon]'
})
export class IconDirective implements OnInit {

  @Input() btnIcon:boolean=false;
  @Input() isFill:boolean=false;
  @Input() severity:iconSeverity='-';

  constructor(
    private element: ElementRef, private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    const paths = this.element.nativeElement.querySelectorAll('path');
    paths.forEach((path: SVGPathElement) => {
      if(this.btnIcon){
        this.renderer.setStyle(this.element.nativeElement,'width','20px');
        this.renderer.setStyle(this.element.nativeElement,'height','20px');
        path.setAttribute('stroke', `var(--main${this.severity}txt-color)`); // Cambiar color
      }else{
        switch (this.isFill){
          case true:
            path.setAttribute('fill', `var(--main${this.severity}txt-color)`);
            break;
          case false:
            path.setAttribute('stroke', `var(--main${this.severity}txt-color)`); // Cambiar color
            break;
        }
      }
    });
  }

}
