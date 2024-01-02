import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs/operators";
import {UserService} from "../../services/user.service";
import {NgxSpinnerService} from "ngx-spinner";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  formData!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  ngOnInit() {
    this.formData = this.formBuilder.group({
      email: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
    });
  }

  onSubmitLogin() {
    console.log(this.formData.getRawValue());
    if (this.formData.invalid) {
      console.log(this.formData.value);
      return;
    }

    this.spinner.show();
    this.userService
      .loginAdmin(this.formData.getRawValue())
      .pipe(finalize(() => this.spinner.hide()))
      .subscribe({
        next: (response: any) => {
          this.toastr.success('Đăng nhập thành công', 'Thành công!', {
            timeOut: 2000,
          });
          this.navigate('/admin/dashboard');
        },
        error: (error) => {
          console.log(error);
          this.toastr.error('Lỗi, vui lòng thực hiện lại', 'Thất bại', {
            timeOut: 2000,
          });
        },
      });
  }

  navigate(path: string): void {
    this.ngZone.run(() => this.router.navigateByUrl(path)).then();
  }

}
