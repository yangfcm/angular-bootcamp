import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ui-modules-home',
  templateUrl: './ui-modules-home.component.html',
  styleUrls: ['./ui-modules-home.component.css'],
})
export class UiModulesHomeComponent implements OnInit {
  openModal = false;
  constructor() {}

  ngOnInit(): void {}

  onToggleModal() {
    this.openModal = !this.openModal;
  }
}
