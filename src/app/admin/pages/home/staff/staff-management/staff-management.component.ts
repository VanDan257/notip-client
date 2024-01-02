import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {ToastrService} from "ngx-toastr";
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

declare const $: any;

@Component({
  selector: 'app-staff-management',
  templateUrl: './staff-management.component.html',
  styleUrls: ['./staff-management.component.css']
})
export class StaffManagementComponent implements OnInit{
  users: any[] = [];
  newUser: any;
  createStaffForm: FormGroup = new FormGroup({});
  maxDate: Date = new Date();
  user = new FormData();
  staffDelete: any | undefined;

  constructor(private userService: UserService, private toastr: ToastrService, private fb: FormBuilder) {  }

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
    this.createStaffForm.controls['password'].valueChanges.subscribe({
      next: () =>
        this.createStaffForm.controls['confirmPassword'].updateValueAndValidity(),
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
    // this.createStaffForm.append('file', this.file);
    // let user = { ...this.createStaffForm.value};
    this.user.append('name', this.createStaffForm.value.name)
    this.user.append('email', this.createStaffForm.value.email)
    this.user.append('phone', this.createStaffForm.value.phone)
    this.user.append('address', this.createStaffForm.value.address)
    this.user.append('password', this.createStaffForm.value.password)
    this.user.append('dob', this.createStaffForm.value.dob)

    console.log(this.user);
    this.userService.createAccountAdmin(this.user).subscribe({
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
