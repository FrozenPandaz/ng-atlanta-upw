import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'fbs-lander',
  templateUrl: './lander.component.html',
  styleUrls: ['./lander.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
