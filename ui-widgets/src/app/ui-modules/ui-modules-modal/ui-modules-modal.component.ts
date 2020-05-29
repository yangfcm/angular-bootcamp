import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-ui-modules-modal',
  templateUrl: './ui-modules-modal.component.html',
  styleUrls: ['./ui-modules-modal.component.css'],
})
export class UiModulesModalComponent implements OnInit, OnDestroy {
  @Output() close = new EventEmitter();
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.el.nativeElement.remove();
  }

  onCloseModal() {
    this.close.emit();
  }
}
