import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMyClass]',
})
export class MyClassDirective {
  constructor(private element: ElementRef) {}

  @Input() set backgroundColor(color: string) {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
