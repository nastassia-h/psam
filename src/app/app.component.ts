import { Component, inject, ViewChild, ViewContainerRef } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortalService } from '@psam/common-ui';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'psam';
  #portalService = inject(PortalService)

  @ViewChild('portalContent', {read: ViewContainerRef})
  set portalContent(container: ViewContainerRef) {
    if (!container) return
    this.#portalService.registerContainer(container)
  }
}
