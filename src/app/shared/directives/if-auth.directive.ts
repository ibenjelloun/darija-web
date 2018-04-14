import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProfilService } from '../../profil/services/profil.service';

@Directive({
  selector: '[darIfAuth]'
})
export class IfAuthorizedDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private _profilService: ProfilService
  ) {}

  @Input()
  set darIfAuth(requiredRank: number) {
    this.viewContainer.clear();
    const profil = this._profilService.getProfilObject();
    if (profil && profil.rank > requiredRank) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    }
  }
}
