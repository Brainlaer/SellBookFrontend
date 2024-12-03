import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[brDropdown]'
})
export class DropdownDirective {

  @Input() disabled:boolean=false;

  constructor(
    private element:ElementRef,
    private renderer:Renderer2
  ) { }

  ngOnInit(): void {
    this.defaultDropdownStyle();
    this.setStyles();
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.setStylesHover(); // Cambia el color de fondo a amarillo
  }

  // Detecta cuando el mouse sale del elemento
  @HostListener('mouseleave') onMouseLeave() {
    this.setStyles(); // Restaura el color original
  }
    setStyles() {
      if (this.disabled) {
        this.disabledDropdown();
      } else {
        this.primaryColor();
      }
      
    }
    setStylesHover() {
      if (this.disabled) {
        this.disabledDropdown();
      } else {
            this.primaryColorHover();
      }
    }

  private defaultDropdownStyle() {
    this.renderer.setStyle(this.element.nativeElement, 'border-radius', '20px');
    this.renderer.setStyle(this.element.nativeElement, 'min-width', '340px');
    this.renderer.setStyle(this.element.nativeElement, 'min-height', '40px');
    this.renderer.setStyle(this.element.nativeElement, 'font-size', '15px');
    this.renderer.setStyle(this.element.nativeElement, 'padding', '0px 20px');
    this.renderer.setStyle(this.element.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.element.nativeElement, 'font-weight', '500');
    this.renderer.setStyle(this.element.nativeElement, 'font-family', 'serif');
  }

  private disabledDropdown() {
    this.renderer.setProperty(this.element.nativeElement,'disabled', 'isDisabled');
    this.renderer.setStyle(this.element.nativeElement, 'color', '#1aaf9d');
    this.renderer.setStyle(this.element.nativeElement, 'background-color', '#20312f');
    this.renderer.setStyle(this.element.nativeElement, 'border', 'solid #1aaf9d 3px');
  }

  private primaryColor() {
    this.renderer.setStyle(this.element.nativeElement, 'color', 'var(--secondary-color)');
    this.renderer.setStyle(this.element.nativeElement, 'background-color', 'var(--card-bg-color)');
    this.renderer.setStyle(this.element.nativeElement, 'border', 'solid var(--secondary-bg-color) 3px');
  }private primaryColorHover() {
    this.renderer.setStyle(this.element.nativeElement, 'border', 'solid var(--secondary-bg-color-hover) 3px');
  }
}
