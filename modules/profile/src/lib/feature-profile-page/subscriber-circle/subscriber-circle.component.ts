import { AfterViewInit, Component, HostListener, input, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImgUrlPipe } from '@psam/common-ui';
import { RouterLink } from '@angular/router';
import { Profile } from '@psam/profile-data';
import { PortalComponent } from '@psam/common-ui';

@Component({
  selector: 'lib-subscriber-circle',
  standalone: true,
  imports: [CommonModule, ImgUrlPipe, RouterLink, PortalComponent],
  templateUrl: './subscriber-circle.component.html',
  styleUrl: './subscriber-circle.component.scss',
})
export class SubscriberCircleComponent {
  subscriber = input.required<Profile>()


  isMouseOver = signal(false)

  @HostListener('mouseover')
  onMouseOver() {
    this.isMouseOver.set(true)
  }

  @HostListener('mouseleave') 
  onMouseLeave() {
    this.isMouseOver.set(false)
  }

  

}
