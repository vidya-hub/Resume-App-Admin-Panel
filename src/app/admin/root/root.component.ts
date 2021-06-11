import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { CustomeHttpService } from '../../service/custome-http.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
        selector: 'app-root',
        templateUrl: './root.component.html',
        styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
        modalRef: NgbModalRef;
        oldPassword: string = ''
        rePassword: string = '';
        newPassword: string = '';
        pleasWaitBtn = false;
        totalBirthDayToday: any = 0;
        constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private modalService: NgbModal, private route: Router, private service: CustomeHttpService, private toast: ToastrService) {
                this.mobileQuery = media.matchMedia('(max-width: 600px)');
                this._mobileQueryListener = () => changeDetectorRef.detectChanges();
                this.mobileQuery.addListener(this._mobileQueryListener);
        }

        ngOnInit() {
                let form = new HttpParams();

                var m: any = new Date().getMonth()
                m = m + 1;
                m = m.toString();
                var d = new Date().getDate().toString()
                var y = new Date().getFullYear()
                if (m.length == 1) {
                        m = '0' + m
                }
                if (d.length == 1) {
                        d = d = '0' + d;
                }
                let date = y + '-' + m + '-' + d;

                form.append('month', m);
                form.append('day', d);
                /*
                this.service.post('gettodaybirthdayusercount',form).then((result: any) => {
                        this.totalBirthDayToday = result.data.totalBirthDayToday;
                }, (error: any) => { 
                })
                */
        }
        mobileQuery: MediaQueryList;


        private _mobileQueryListener: () => void;



        ngOnDestroy(): void {
                this.mobileQuery.removeListener(this._mobileQueryListener);
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
                // alert(1)
        }
        fnOpenChangePasswordModel(modal) {
                this.oldPassword = ''
                this.newPassword = ''
                this.rePassword = ''
                this.pleasWaitBtn = false
                this.modalRef = this.modalService.open(modal, { backdrop: 'static' });
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
                if (this.newPassword != this.rePassword) {
                        this.toast.error('New password and re-enter password are diffrent.')
                        return false;
                }
                let form = new HttpParams()
                form.append('oldPassword', this.oldPassword)
                form.append('newPassword', this.newPassword)
                this.pleasWaitBtn = true;
                /*
                this.service.post('changepasswordadmin', form).then((result: any) => {
                        if (result && result.msg && result.msg != '') {

                                this.toast.success(result.msg)
                        } else {

                        }
                        this.modalRef.dismiss()
                }, (error: any) => {
                        this.pleasWaitBtn = true;
                })
                */
        }
        data
        fnLoadFile(evt: any) {
                const target: DataTransfer = <DataTransfer>(evt.target);
                if (target.files.length !== 1) throw new Error('Cannot use multiple files');
                const reader: FileReader = new FileReader();
                reader.onload = async (e: any) => {
                        console.log("i am here")
                        /* read workbook */
                        const bstr: string = e.target.result;
                        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

                        /* grab first sheet */
                        const wsname: string = wb.SheetNames[0];
                        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

                        /* save data */
                        this.data = XLSX.utils.sheet_to_json(ws, { header: 1 });
                        this.fnManupalateData();
                };
                reader.readAsBinaryString(target.files[0]);
        }

        async fnManupalateData() {
                let form = new HttpParams().set('data', JSON.stringify(this.data));
                var result = await this.service.post('test', form);
                console.log(result);
        }

        fnFetchResumeData() {            
                let form = new HttpParams();
                this.service.post('get_all_user_resume', form).then((result: any) => {
                        const finalData = [];
                        for(let i=0; i < result.data.length; i++){
                                const element = result.data[i];
                                for (const key in element) {
                                        if (element.hasOwnProperty(key)) {
                                               if(Array.isArray(element[key])){
                                                        if(key == "workHistory" || key == "refrences" || key == "education"){
                                                                if(element[key].length > 0){
                                                                        element[key] = JSON.stringify(element[key])
                                                                }
                                                                else{
                                                                        element[key] = element[key].join(",");
                                                                }
                                                        }
                                                        else{
                                                                element[key] = element[key].join(",");
                                                        }
                                                }
                                        }
                                }
                                const { _id, __v, ...rest} = element;
                                finalData.push(rest);
                        }
                        const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(finalData);
                        const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
                        const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                        this.saveAsExcelFile(excelBuffer, 'User_Resume');
                })                
        }
        private saveAsExcelFile(buffer: any, fileName: string): void {
                const data: Blob = new Blob([buffer], {
                  type: EXCEL_TYPE
                });
                FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
        }
}
