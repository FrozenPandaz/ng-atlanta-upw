import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Component({
  selector: 'upw-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isNode: boolean = isPlatformServer(this.platformId);

  constructor(@Inject(PLATFORM_ID) private platformId: string) { }

  ngOnInit() {
  }

}
