import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {NgxSpinnerService} from "ngx-spinner";
import {finalize} from "rxjs/operators";

declare const $: any;

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit{
  users: any[] = [];
  pageSize = 10; // Số lượng mục trên mỗi trang
  pageNumber = 1;

  createStaffForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  user = new FormData();
  staffDelete: any | undefined;

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private fb: FormBuilder,
              private spinner: NgxSpinnerService) {  }

  ngOnInit() {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 10);
    this.getAllAdmin();
  }

  initializeForm(): void {
    this.createStaffForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      gender: [''],
      phone: [''],
      dob: [''],
      avatar: {},
      role: [''],
      address: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.maxLength(16),
          Validators.minLength(4),
        ],
      ],
    });
  }

  getAllAdmin() {
    this.userService.getAllAdmin().subscribe({
      next: (response: any) => {
        this.users = response;
      }
    })
  }

  createStaff(){
    this.spinner.show();
    this.user.append('name', this.createStaffForm.value.name)
    this.user.append('gender', this.createStaffForm.value.gender)
    this.user.append('role', this.createStaffForm.value.role)
    this.user.append('email', this.createStaffForm.value.email)
    this.user.append('phone', this.createStaffForm.value.phone)
    this.user.append('address', this.createStaffForm.value.address)
    this.user.append('password', this.createStaffForm.value.password)
    this.user.append('dob', this.createStaffForm.value.dob)

    this.userService.createAccountAdmin(this.user).pipe(
        finalize(() => {
          this.spinner.hide();
        })
    ).subscribe({
      next: _ => {
        this.getAllAdmin();
        $('#modalCreateStaff').modal('hide');
        this.toastr.success('', 'Tạo tài khoản nhân viên thành công!', {
          timeOut: 2000,
        });
      },
      error: (err) => {
        this.toastr.error('', err, {
          timeOut: 2000,
        })
      }
    })
  }

  deleteStaff(id: any){
    this.userService.deleteAdmin(id).subscribe({
      next: _ => {
        this.getAllAdmin();
        this.toastr.success('', 'Xóa nhân viên thành công', {
          timeOut: 2000
        })
        $('#modalDeleteStaff').modal('hide');
      },
      error: (err) => {
        this.toastr.error('', err, {
          timeOut: 2000
        })
      }
    })
  }

  onCreateStaff(){
    $('#modalCreateStaff').modal();
  }

  onDeleteStaff(user: any){
    this.staffDelete = user;
    $('#modalDeleteStaff').modal();
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      let filesToUpload: any[] = [];
      for (let i = 0; i < event.target.files.length; i++) {
        filesToUpload.push(event.target.files[i]);
      }
      this.user.append('file', filesToUpload[0]);
    }
  }
}
