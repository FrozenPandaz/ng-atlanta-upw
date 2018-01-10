import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'upw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'upw';

  constructor(private swUpdate: SwUpdate) {

  }

  ngOnInit() {
    this.swUpdate.activated.subscribe((event) => {
      // tslint:disable-next-line:no-console
      console.log('Serviceworker updated', event);
    });
    this.swUpdate.available.subscribe((event) => {
      // tslint:disable-next-line:no-console
      console.log('Serviceworker is available', event);
    });
  }
}
