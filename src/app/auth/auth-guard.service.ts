import { Injectable, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { AuthenticationService } from "../core/service/authentication.service";

@Injectable({
    providedIn: 'root'
})

export class AuthGuardService  {
    constructor(
        private ngZone: NgZone,
        private router: Router,
        private authService: AuthenticationService
    ) { }

    canActivate() {
        const token = this.authService.getToken;
        if (token == null) {
            this.navigate("/dang-nhap");
            return false;
        }
        return true;
    }

    public navigate(path: string) : void {
        this.ngZone.run(() => this.router.navigateByUrl(path)).then();
    }
}
