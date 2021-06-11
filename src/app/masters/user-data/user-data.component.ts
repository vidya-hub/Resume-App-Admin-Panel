import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MediaMatcher } from '@angular/cdk/layout';
import { CustomeHttpService } from 'src/app/service/custome-http.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from "file-saver";

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.scss']
})
export class UserDataComponent implements OnInit {
  loadding: boolean = false;
  pleaseWaitBtn: boolean = false;
  pleasewaitforloadmore: boolean = false
  loadmore: boolean = false;
  userdata = [];
  selectedUser: any;
  mobileQuery: MediaQueryList;
  jobTitleSearchString:string = "";
  stateSearchString:string = "";
  countrySearchString:string = "";
  citySearchString:string = "";
  userType: string = "";
  private _mobileQueryListener: () => void;

  constructor(private service: CustomeHttpService, private toast: ToastrService, private route: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) { 
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(){
    this.userType = localStorage.getItem("userType");
    if(this.userType == '' || this.userType == 'RESUMEADMIN'){
      this.route.navigateByUrl('/home');
    }
    this.getUserData();
  }

  getUserData(){
    this.userdata = []
    this.pleasewaitforloadmore = true;
    this.loadding = true;
    let form = new HttpParams()
    this.service.post('get_all_users_latest_data', form).then((result: any) => {
        for (let index = 0; index < result.data.length; index++) {
            result.data.id = parseInt(result.data.id)
        }
        if (this.userdata.length > 0) {
            this.userdata = this.userdata.concat(result.data)
        } else {
            this.userdata = result.data
        }
        this.loadding = false;
        this.pleasewaitforloadmore = false;
    }, (error: any) => {
        if (error.msg == 'no data found') {
            this.loadmore = false;
            this.pleasewaitforloadmore = false;
            this.loadding = false;
        }
    })
  }

  fnDownloadResume(user, i){
    this.selectedUser = user;
    let filename = `${user.name.replace(' ','-')}-latest-resume.pdf`;
    let form = new HttpParams().set('email', user.email);
    this.service.postForResume('get_user_latest_resume', form).subscribe(
      data => {
        if(data.type == "application/json"){
          this.toast.error("No Resume Found")
        }
        else{
          saveAs(data, filename);
        }
      },
      err => {
        alert("Problem while downloading the file.");
        console.error(err);
      }
    );
  }

  fnDeleteUser(user, i){
    if(this.userType == "MAINADMIN"){
      if(confirm("Are you sure you want to delete this user?")){
        let form = new HttpParams().set('email', user.email);
        this.service.post('deleteUser', form).then((result: any) => {
            if (result && result.msg && result.msg != '') {
              this.toast.success(result.msg)
              this.getUserData();
            }
          }, (error: any) => {
            this.toast.error(error)
        })
      }
    }
    else{
      this.toast.error("You dont have access to delete users")
    }
  }

  fnLogout() {
    localStorage.clear()
    this.route.navigateByUrl('login')
    // let form = new HttpParams();
    // this.service.post('logout', form).then(() => {
    //   localStorage.clear()
    //   this.route.navigateByUrl('login')
    // }, () => {
    //   localStorage.clear()
    //   this.route.navigateByUrl('login')
    // })
  }
}