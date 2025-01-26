import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VexConfigService } from '@vex/config/vex-config.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'vex-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, AsyncPipe]
})
export class FooterComponent implements OnInit, OnDestroy {

  imageUrl$ = this.configService.config$.pipe(
      map((config) => config.sidenav.imageUrl)
    );

  constructor(private configService: VexConfigService,) {}

  ngOnInit() {}

  ngOnDestroy(): void {}
}
