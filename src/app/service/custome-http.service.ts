import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
        providedIn: 'root'
})
export class CustomeHttpService {

        constructor(private http: HttpClient, private toast: ToastrService, private route: Router) { }
        // baseUrl = 'http://52.66.242.48:3001/api/'
        // baseUrl = 'http://165.227.248.244:3001/api/'
        baseUrl = 'http://206.189.131.247:3001/api/'
        // baseUrl = 'http://localhost:3001/api/'
        itemParPage = 20
        jobTitle = [];
        experianceArray = [
                {
                        name:"Frasher",
                        value:"1"
                },
                {
                        name:"0-3 years",
                        value:"2"
                },
                {
                        name:"3-5 years",
                        value:"3"
                },
                {
                        name:"5-10 years",
                        value:"4"
                },
                {
                        name:"10+ years",
                        value:"5"
                }

        ];
        post(url, form: HttpParams = new HttpParams()) {
                let tk = localStorage.getItem('token');
                if (tk) {
                        var headers: HttpHeaders = new HttpHeaders()
                                .set('Authorization','Bearer '+ tk)
                                .set('UserType', 'ADMIN');
                }
                return new Promise<any>((resolve, reject) => {
                        this.http.post(this.baseUrl + url, form, { headers: headers }).subscribe((result: any) => {
                                if (result.status == 'success') {
                                        resolve(result);
                                } else {
                                        if (result && result.code && (result.code == 401 || result.code == 402 || result.code == 403)) {
                                                localStorage.clear()
                                                this.toast.error(result.msg)
                                                this.route.navigateByUrl('/login')
                                        } else {
                                                if (result && result.msg && result.msg != '') {
                                                        if (result.msg != 'no data found')
                                                                this.toast.error(result.msg)
                                                        // this.toast.error(result.msg)
                                                } else {
                                                        this.toast.error('Something happened wrong.Please try again after sometime.')
                                                }
                                        }
                                        reject(result)
                                }
                        }, (error: any) => {

                                if (error && error.msg && error.msg != '') {
                                        if (error.msg != 'no data found')
                                                this.toast.error(error.msg)
                                } else {
                                        this.toast.error('Something happened wrong try again after sometimes')

                                }
                                reject(error)
                        })
                })
        }

        
        postForResume(url, form: HttpParams = new HttpParams()) {
                let tk = localStorage.getItem('token');
                if (tk) {
                        var headers: HttpHeaders = new HttpHeaders()
                                .set('Authorization','Bearer '+ tk)
                                .set('UserType', 'ADMIN');
                }
                return this.http.post(this.baseUrl + url, form, { responseType: "blob", headers: headers })
                               
        }
}
