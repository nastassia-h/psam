/* eslint-disable no-unused-private-class-members */
import { ElementRef, Injectable, TemplateRef, ViewContainerRef, ViewRef } from "@angular/core";

@Injectable({
   providedIn: "root"
})
export class PortalService {
   #container?: ViewContainerRef

   registerContainer(vcr: ViewContainerRef) {
      this.#container = vcr;
   }

   embendView(view: TemplateRef<any>) {
      setTimeout(() => {
         if (!this.#container) return
         this.#container.createEmbeddedView(view)
      })
   }
   destroy() {
      this.#container?.clear();
   }
}