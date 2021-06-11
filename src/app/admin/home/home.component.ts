import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CustomeHttpService } from '../../service/custome-http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';

@Component({
        selector: 'app-home',
        templateUrl: './home.component.html',
        styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
        userType: string =``;
        constructor(private route: Router, private service: CustomeHttpService,private toast: ToastrService) {
        }

        ngOnInit(){
                this.userType = localStorage.getItem('userType');
                if(this.userType == ''){
                        this.route.navigateByUrl('/login')
                }
                console.log(this.userType)
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