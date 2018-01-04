import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'upw-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit {
  title = 'upw';

  ngOnInit() {
  }
}
