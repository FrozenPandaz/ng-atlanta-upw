import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'upw-empty',
  templateUrl: './empty.component.html',
  styleUrls: ['./empty.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
