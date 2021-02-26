import { Component, OnInit } from '@angular/core';
import { TitleService } from 'src/app/core/services';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [TitleService]
})
export class AppComponent implements OnInit {
  constructor(private _titleService: TitleService,) { }

  ngOnInit(): void {
    this._titleService.init();
  }
}
