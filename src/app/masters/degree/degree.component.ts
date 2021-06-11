import { Component, OnInit  } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomeHttpService } from 'src/app/service/custome-http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-degree',
    templateUrl: './degree.component.html',
    styleUrls: ['./degree.component.scss']
})
export class DegreeComponent implements OnInit {

    modalRef: NgbModalRef;
    loadding: boolean = false;
    pleaseWaitBtn: boolean = false;
    page = 0;
    pleasewaitforloadmore: boolean = false
    loadmore: boolean = false;
    name = '';
    categories = [];
    selectedCategory: any;
    selectedCategoryIndex: any;
    searchName = '';
    statusSearch = '';
    orderField: string;
    orderBy: string;
    type = '3'
    center_id = ''
    centers = [];
    searchTitle = ''
    selectedFilterCenter = ''
    filterData: { status: string; selectedFilterCenter: string; } = {
        status: '',
        selectedFilterCenter: ""
    }
    data: any;
    file: File = null;
    pleaseWaitUploadBtn = false;

    constructor(private modalService: NgbModal, private service: CustomeHttpService, private toast: ToastrService) { }

    ngOnInit() {
        this.fnGetCategories();
        this.fnGetCenter();
        this.loadding = true;
    }

    fnOrderBy(field) {
        this.orderField = field;
        if (!this.orderBy || this.orderBy == 'DESC') {
            this.orderBy = 'ASC';
        } else {
            this.orderBy = 'DESC'
        }
        this.page = 0;
        this.categories = []
        this.fnGetCategories();
        this.loadding = true;

    }
    fnGetCenter() {
        let form = new HttpParams()

        //   this.service.post('getcentersname', form).then((result: any) => {
        //       this.centers = result.data
        //   }, (error: any) => {

        //   })



    }
    fnGetCategories() {
        this.pleasewaitforloadmore = true
        let form = new HttpParams()
        let j = this.page
        if (this.orderField && this.orderBy) {
            form.append('orderField', this.orderField)
            form.append('orderBy', this.orderBy)
        }
        form.append('page', j.toString())
        form.append('type', this.type)
        form.append('filter', JSON.stringify(this.filterData))
        this.service.post('admin/get_all_degree', form).then((result: any) => {
            this.page++;
            for (let index = 0; index < result.data.length; index++) {
                result.data.id = parseInt(result.data.id)
            }
            if (this.categories.length > 0) {
                this.categories = this.categories.concat(result.data)
            } else {
                this.categories = result.data
            }
            let itemParPage = this.service.itemParPage;
            if (result.data.length < itemParPage) {
                this.loadmore = false;
            } else {
                this.loadmore = true;
            }
            this.loadmore = false;
            this.loadding = false;
            this.pleasewaitforloadmore = false;
        }, (error: any) => {
            this.loadmore = false;
            this.pleasewaitforloadmore = false;
            this.loadding = false;
        })


    }

    fnValidateNameField(event: any) {
        if (!this.name || this.name == '') {
            event.target.className = event.target.className + ' is-invalid'
        } else {
            event.target.className = "form-control ng-valid ng-touched ng-dirty is-valid"
        }
    }

    fnOpenAddCategoryModal(modal) {
        this.name = '';
        this.pleaseWaitBtn = false;
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
    }

    fnOpenEditCategoryModal(modal, category, i) {
        this.selectedCategory = category;
        this.selectedCategoryIndex = i;
        this.pleaseWaitBtn = false;
        this.name = JSON.parse(JSON.stringify(category.title));
        // this.center_id = JSON.parse(JSON.stringify(category.center_id));
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
    }

    fnOpenDeleteCategoryModal(modal, category, i) {
        this.selectedCategory = category;
        this.selectedCategoryIndex = i;
        this.pleaseWaitBtn = false;
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
    }

    fnOpenDisableCategoryModal(modal, category, i) {
        this.selectedCategory = category;
        this.selectedCategoryIndex = i;
        this.pleaseWaitBtn = false;
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
    }

    fnOpenEnableCategoryModal(modal, category, i) {
        this.selectedCategory = category;
        this.selectedCategoryIndex = i;
        this.pleaseWaitBtn = false;
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
    }

    fnSubmitCategory() {
        if (!this.name || this.name == '') {
            this.toast.error('Enter a valid name.')
            return false;
        }
        let form = new HttpParams().set('title', this.name)
        // form.append('center_id', this.center_id)
        // form.append('type', this.type)
        this.pleaseWaitBtn = true;
        this.service.post('admin/add_degree', form).then((result: any) => {
            if (result && result.msg && result.msg != '') {
                this.toast.success(result.msg)
            }
            this.categories.splice(0, 0, result.data)
            this.modalRef.dismiss()
        }, (error: any) => {
            this.pleaseWaitBtn = false;
        })
    }

    fnUpdateCategory() {
        if (!this.name || this.name == '') {
            this.toast.error('Enter a valid name.')
            return false;
        }
        let form = new HttpParams().set('title', this.name).set('id', this.selectedCategory._id)
        this.pleaseWaitBtn = true;
        this.service.post('admin/update_degree', form).then((result: any) => {
            if (result && result.msg && result.msg != '') {
                this.toast.success(result.msg)
            }
            this.categories[this.selectedCategoryIndex].title = this.name;
            this.modalRef.dismiss();
        }, (error: any) => {
            this.pleaseWaitBtn = false;
        })
    }

    fnEnableCategory() {
        let form = new HttpParams().set('id', this.selectedCategory._id)
        this.pleaseWaitBtn = true;
        this.service.post('admin/enable_degree', form).then((result: any) => {
            if (result && result.msg && result.msg != '') {
                this.toast.success(result.msg)
            }
            this.categories[this.selectedCategoryIndex].status = 1;
            this.modalRef.dismiss();
        }, (error: any) => {
            this.pleaseWaitBtn = false;
        })
    }

    fnDisableCategory() {
        let form = new HttpParams().set('id', this.selectedCategory._id)
        this.pleaseWaitBtn = true;
        this.service.post('admin/disable_degree', form).then((result: any) => {
            if (result && result.msg && result.msg != '') {
                this.toast.success(result.msg)
            }
            this.categories[this.selectedCategoryIndex].status = 0;
            this.modalRef.dismiss();
        }, (error: any) => {
            this.pleaseWaitBtn = false;
        })
    }

    fnDeleteCategory() {
        let form = new HttpParams().set('id', this.selectedCategory._id)
        this.pleaseWaitBtn = true;
        this.service.post('admin/delete_degree', form).then((result: any) => {
            if (result && result.msg && result.msg != '') {
                this.toast.success(result.msg)
            }
            this.categories.splice(this.selectedCategoryIndex, 1);
            this.modalRef.dismiss();
        }, (error: any) => {
            this.pleaseWaitBtn = false;
        })
    }

    fnOpenFilterModal(modal) {
        this.selectedFilterCenter = this.filterData.selectedFilterCenter
        this.statusSearch = this.filterData.status
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true, keyboard: false, backdrop: 'static' })
    }

    fnFilter() {
        this.loadding = true
        this.page = 0;
        this.categories = []
        this.filterData = {
            status: this.statusSearch,
            selectedFilterCenter: this.selectedFilterCenter
        }
        this.fnGetCategories();
        this.fnDismissModel()
    }

    fnDismissModel() {
        if (this.modalRef)
            this.modalRef.dismiss()
        this.file=null;
    }

    onChange(event) {
        this.file = event.target.files[0];
    }
  
    uploadFile() {
        if(this.file != null){
            this.pleaseWaitUploadBtn = true;
            const reader: FileReader = new FileReader();
            reader.onload = async (e: any) => {
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
            reader.readAsBinaryString(this.file);
        }        
    }

    async fnManupalateData() {
        const dataToPost = [];
        if(this.data.length > 1){
            const key = this.data[0];
            for(let i=1; i< this.data.length; i++){
                const element = this.data[i];
                const tempObj = {};
                for(let j=0; j<key.length; j++){
                    tempObj[key[j]] = element[j]
                }
                dataToPost.push(tempObj);
            }
            let form = new HttpParams().set('data', JSON.stringify(dataToPost));
            const result = await this.service.post('test', form);
            if(result.msg){
                this.toast.success("Data Imported Successfully")
            }
            this.file = null;
            this.pleaseWaitUploadBtn = false;
            this.fnDismissModel()
        }
    }

    fnOpenImportExcelModal(modal) {
        this.pleaseWaitBtn = false;
        this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
    }
}
