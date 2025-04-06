import { AfterViewInit, Component, inject, OnDestroy, TemplateRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarPortalService } from './sidebar-portal.service';

@Component({
  selector: 'lib-sidebar-portal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar-portal.component.html',
  styleUrl: './sidebar-portal.component.css',
})
export class SidebarPortalComponent implements AfterViewInit, OnDestroy {
  sidebarPortalService = inject(SidebarPortalService)
  template = viewChild('portalContent', {read: TemplateRef})
  
  ngAfterViewInit(): void {
    const portalContent = this.template();
    if (!portalContent) return;
    this.sidebarPortalService.embendView(portalContent)
  }

  ngOnDestroy(): void {
    this.sidebarPortalService.destroy();
  }

}
