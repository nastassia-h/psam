import { AfterViewInit, Component, effect, inject, input, OnDestroy, signal, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalService } from './portal.service';

@Component({
  selector: 'lib-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './portal.component.html',
  styleUrl: './portal.component.scss',
})
export class PortalComponent implements AfterViewInit, OnDestroy {
  portalService = inject(PortalService)
  template = viewChild('portalContent', {read: TemplateRef})
  host = input<HTMLElement>()

  top = signal(0)
  left = signal(0)

  constructor() {
    effect(() => {
      const host = this.host();
      if (!host) return;
      const {bottom, left} = host.getBoundingClientRect();
      this.top.set(bottom)
      this.left.set(left)
    }, {allowSignalWrites: true})
  }
  
  ngAfterViewInit(): void {
    const portalContent = this.template();
    if (!portalContent) return;
    this.portalService.embendView(portalContent)
  }

  ngOnDestroy(): void {
    this.portalService.destroy();
  }

}
