import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardHilight]',
})
export class CardHilight {
  @Input() set appCardHilight(condition: boolean) {
    this.updateHighlight(condition);
  }

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  private updateHighlight(condition: boolean) {
    if (condition) {
      this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'oklch(59.6% 0.145 163.225)');
      this.renderer.setStyle(this.el.nativeElement, 'boxShadow', '0 0 10px rgba(255, 255, 0, 1)');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'backgroundColor');
      this.renderer.removeStyle(this.el.nativeElement, 'boxShadow');
    }
  }
}
