import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CustomeHttpService } from '../../service/custome-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
        selector: 'app-login',
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
        modalRef: NgbModalRef;
        pleaseWait: boolean = false;
        email = '';
        password = '';
        fpEmail = '';
        fpMobileNo = '';
        btnWaitFP = false
        login = true
        isOTPSent: Boolean = false;
        fpEmailDisable: Boolean = false;
        fpEnteredEmail: string = '';
        fpNewPassword: string = '';
        fpConfirmNewPassword: string = '';
        fpOTP: string = '';
        constructor(private modalService: NgbModal, private service: CustomeHttpService, private toast: ToastrService, private route: Router) { }

        ngOnInit() {
                if (localStorage.getItem('token')) {
                        this.route.navigateByUrl('')
                }
        }

        fnOpenForgetPasswordModal(modal) {
                this.fpEmail = '';
                this.fpMobileNo = '';
                this.pleaseWait = false;
                this.btnWaitFP = false
                this.login = false;
                // this.modalRef = this.modalService.open(modal, { backdrop: 'static' });
        }
        fnGotLogin() {
                this.login = true;
        }
        fnCloseForgotPasswordModel() {
                this.pleaseWait = false;
                this.modalRef.dismiss()
        }

        fnLogin() {
                if (!this.email || this.email == '') {
                        this.toast.error('Mobile No. or Password does not matched.');
                        return false;
                }
                if (!this.password || this.password == '') {
                        this.toast.error('Mobile No. or Password does not matched.');
                        return false;
                }
                let form = new HttpParams().set('email', this.email).set('password', this.password);
                this.pleaseWait = true;
                this.service.post('login', form).then((result: any) => {
                        this.pleaseWait = false;
                        localStorage.setItem('token', result.data.token)
                        localStorage.setItem('email', result.data.email)
                        localStorage.setItem('mobileNo', result.data.mobileNo)
                        localStorage.setItem('id', result.data._id)
                        localStorage.setItem('userType', result.data.usertype)
                        if (result && result.msg && result.msg != '') {
                                this.toast.success(result.msg)
                        } else {

                        }
                        this.route.navigateByUrl('/home')
                }, (error: any) => {
                        this.pleaseWait = false;
                })
        }

        fnCancel() {
                this.modalRef.dismiss();
        }

        fnForgorPassword() {
                if(this.isOTPSent){
                        if(this.fpNewPassword.trim().length <= 3){
                                this.toast.error('Password must have atleast 3 characters');
                                return false;
                        }
                        else if(this.fpNewPassword.trim() != this.fpConfirmNewPassword.trim()){
                                this.toast.error('Confirm Password and New Password Should be same');
                                return false;
                        }
                        else{
                                this.btnWaitFP = true;
                                let form = new HttpParams().set('email', this.fpEnteredEmail).set('password', this.fpNewPassword).set('otp', this.fpOTP)
                                this.service.post('verify_otp_changepassword', form).then((result: any) => {
                                        this.btnWaitFP = false
                                        if (result && result.msg && result.msg != '') {
                                                this.isOTPSent = false;
                                                this.fpEmailDisable = false;
                                                this.fpNewPassword = '';
                                                this.fpConfirmNewPassword = '';
                                                this.fpEmail = '';
                                                this.fpEnteredEmail = '';
                                                this.fpOTP = '';
                                                this.login = true;
                                                this.toast.success(result.msg)
                                        }
                                }, (error: any) => {
                                        this.pleaseWait = false;
                                        this.btnWaitFP = false;
                                })
                        }
                }
                else{
                        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        if (!this.fpEmail || this.fpEmail == '') {
                                this.toast.error('Enter email id.');
                                return false;
                        } else if (!re.test(this.fpEmail)) {
                                this.toast.error('Enter valid email id.');
                                return false;
                        }
                        this.fpEnteredEmail = this.fpEmail;
                        this.btnWaitFP = true;
                        let form = new HttpParams().set('email', this.fpEmail)
                        this.service.post('send_otp_to_email', form).then((result: any) => {
                                this.btnWaitFP = false
                                if (result && result.msg && result.msg != '') {
                                        this.isOTPSent = true;
                                        this.fpEmailDisable = true;
                                        this.toast.success(result.msg)
                                }
                        }, (error: any) => {
                                this.pleaseWait = false;
                                this.btnWaitFP = false;
                        })
                }
        }

}
