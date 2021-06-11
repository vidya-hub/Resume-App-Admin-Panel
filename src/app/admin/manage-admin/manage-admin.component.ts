import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CustomeHttpService } from '../../service/custome-http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';

@Component({
        selector: 'app-manage-admin',
        templateUrl: './manage-admin.component.html',
        styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {
    userId : any;
    email: string = ``;
    oldPassword: string = ``;
    newPassword: string = ``;
    rePassword: string = ``;
    pleasWaitBtn = false;
    pleasWaitUpdateBtn = false;
    cfname: string = ``;
    clname: string = ``;
    cmobileNo: string = ``;
    cemail: string = ``;
    newFname: string = ``;
    newLname: string = ``;
    newMobileNo: string = ``;
    newEmail: string = ``;
    newAddPassword: string = ``;
    userType: string = ``;
    userData: Boolean = false;
    resumeData: Boolean = false;
    constructor(private route: Router, private service: CustomeHttpService,private toast: ToastrService) {
    }

    ngOnInit(){
        this.userId = localStorage.getItem('id')
        this.email = localStorage.getItem('email')
        this.cemail = localStorage.getItem('email')
        this.userType = localStorage.getItem('userType');
        if(this.userType == ''){
            this.route.navigateByUrl('/home');
        }
        this.fnGetAdminData();
    }

    fnGetAdminData(){
        let form = new HttpParams().set('userId', this.userId)
        this.pleasWaitUpdateBtn = true;
        this.service.post('get_admin_data', form).then((result: any) => {
                if (result && result.msg && result.msg != '') {
                    this.cfname = result.data.firstName;
                    this.clname = result.data.lastName;
                    this.cmobileNo = result.data.phone;
                    this.cemail = result.data.email;
                }
                this.pleasWaitUpdateBtn = false;
        }, (error: any) => {
                this.pleasWaitUpdateBtn = false;
                console.log(error)
        })
    }

    fnChangePassword() {
        if (!this.oldPassword || this.oldPassword == '') {
                this.toast.error('Enter an old password.')
                return false;
        }
        if (!this.newPassword || this.newPassword == '') {
                this.toast.error('Enter a new password.')
                return false;
        }
        if (!this.rePassword || this.rePassword == '') {
            this.toast.error('Enter a new password again.')
            return false;
        }
        if (this.newPassword != this.rePassword) {
                this.toast.error('New password and re-enter password are diffrent.')
                return false;
        }
        let form = new HttpParams().set('userId', this.userId).set('oldPassword', this.oldPassword).set('newPassword', this.newPassword)
        this.pleasWaitBtn = true;
        this.service.post('change_admin_password', form).then((result: any) => {
                if (result && result.msg && result.msg != '') {
                    this.toast.success(result.msg)
                }
                this.oldPassword = ``;
                this.newPassword = ``;
                this.rePassword = ``;
                this.pleasWaitBtn = false;
        }, (error: any) => {
                this.pleasWaitBtn = false;
                console.log(error)
        })
    }

    fnUpdateData(){
        if (!this.cemail || this.cemail == '') {
            this.toast.error('Enter an email.')
            return false;
        }
        if (!this.cfname || this.cfname == '') {
            this.toast.error('Enter a Firstname.')
            return false;
        }
        if (!this.clname || this.clname == '') {
            this.toast.error('Enter a Lastname.')
            return false;
        }
        if (!this.cmobileNo || this.cmobileNo == '') {
            this.toast.error('Enter mobile number.')
            return false;
        }
        let form = new HttpParams().set('userId', this.userId).set('firstName', this.cfname).set('lastName', this.clname).set('email', this.cemail).set('phoneNo', this.cmobileNo)
        this.pleasWaitBtn = true;
        this.service.post('updateUserAdminProfile', form).then((result: any) => {
                if (result && result.msg && result.msg != '') {
                    this.toast.success(result.msg)
                }
                this.pleasWaitBtn = false;
        }, (error: any) => {
                this.pleasWaitBtn = false;
                console.log(error)
        })
    }

    validateEmail(email) {
        const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regularExpression.test(String(email).toLowerCase());
    }

    validatePhone(phone){
        const regularExpression = /^[0-9]{10,10}$/;
        return regularExpression.test(String(phone).toLowerCase());
    }

    fnAddAdmin(){
        if (!this.newEmail || this.newEmail == '') {
            this.toast.error('Enter an email.')
            return false;
        }
        if(!this.validateEmail(this.newEmail)){
            this.toast.error('Enter a valid email.')
            return false;
        }
        if (!this.newFname || this.newFname == '') {
            this.toast.error('Enter a Firstname.')
            return false;
        }
        if (!this.newLname || this.newLname == '') {
            this.toast.error('Enter a Lastname.')
            return false;
        }
        if (!this.newMobileNo || this.newMobileNo == '') {
            this.toast.error('Enter mobile number.')
            return false;
        }
        if(!this.validatePhone(this.newMobileNo)){
            this.toast.error('Enter a valid mobile number.')
            return false;
        }
        if (!this.newAddPassword || this.newAddPassword == '') {
            this.toast.error('Enter a password.')
            return false;
        }
        if(!this.userData && !this.resumeData){
            this.toast.error('Please Select Any One Option in Give Access')
            return false;
        }
        let usertype: string = 'USERRESUMEADMIN'
        if(this.userData && this.resumeData){
            usertype = 'USERRESUMEADMIN'
        }
        else if(this.userData){
            usertype = 'USERADMIN'
        }
        else if(this.resumeData){
            usertype = 'RESUMEADMIN'
        }
        let form = new HttpParams().set('firstName', this.newFname).set('lastName', this.newLname).set('email', this.newEmail).set('phone', this.newMobileNo).set('password', this.newAddPassword).set('usertype',usertype);
        this.pleasWaitBtn = true;
        this.service.post('registerAdmin', form).then((result: any) => {
                if (result && result.msg && result.msg != '') {
                    this.toast.success(result.msg)
                }
                this.newEmail = ``;
                this.newFname = ``;
                this.newLname = ``;
                this.newMobileNo = ``;
                this.newAddPassword = ``;
                this.userData = false;
                this.resumeData = false;
                this.pleasWaitBtn = false;
        }, (error: any) => {
                this.pleasWaitBtn = false;
                console.log(error)
        })
    }

    fnLogout() {
        localStorage.clear()
        this.route.navigateByUrl('login')
        // let form = new HttpParams();
        // this.service.post('logout', form).then(() => {
        //         localStorage.clear()
        //         this.route.navigateByUrl('login')
        // }, () => {
        //         localStorage.clear()
        //         this.route.navigateByUrl('login')
        // })
    }
}