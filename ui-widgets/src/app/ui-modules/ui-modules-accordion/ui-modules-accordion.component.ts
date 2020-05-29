import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ui-modules-accordion',
  templateUrl: './ui-modules-accordion.component.html',
  styleUrls: ['./ui-modules-accordion.component.css'],
})
export class UiModulesAccordionComponent implements OnInit {
  @Input() items = [];
  openedItemIndex = 0;
  constructor() {}

  ngOnInit(): void {}

  onToggleContent(index: number) {
    if (index === this.openedItemIndex) {
      this.openedItemIndex = -1;
    } else {
      this.openedItemIndex = index;
    }
  }
}
