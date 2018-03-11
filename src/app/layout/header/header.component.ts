import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'dar-header',
  templateUrl: 'header.component.html',
  styleUrls: ['header.component.css']
})
export class HeaderComponent {
  @Output() openMenu = new EventEmitter<any>();
  @Input() nightMode;

  constructor() {}
}
