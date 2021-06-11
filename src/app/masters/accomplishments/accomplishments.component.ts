import { Component, OnInit } from '@angular/core';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomeHttpService } from 'src/app/service/custome-http.service';
import { ToastrService } from 'ngx-toastr';
import { HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accomplishments',
  templateUrl: './accomplishments.component.html',
  styleUrls: ['./accomplishments.component.scss']
})
export class AccomplishmentsComponent implements OnInit {
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
  jobtitleId = "";
  jobtitle = "";
  selectedExp = [];
  filterData: { status: string; selectedFilterCenter: string; } = {
    status: '',
    selectedFilterCenter: ""
  }
  constructor(private modalService: NgbModal, public service: CustomeHttpService, private toast: ToastrService, private activatedRoute: ActivatedRoute) { }
  ngOnInit() {
    this.activatedRoute.params.subscribe((pramas: any) => {
      this.jobtitleId = pramas.id
      this.jobtitle = pramas.name
      this.fnGetCategories();
      this.fnGetCenter();
      this.loadding = true;
    })

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

    // this.service.post('getcentersname', form).then((result: any) => {
    //   this.centers = result.data
    // }, (error: any) => {

    // })



  }

  fnGetCategories() {
    this.pleasewaitforloadmore = true
    let form = new HttpParams().set('jobtitleId',this.jobtitleId)
    let j = this.page
    if (this.orderField && this.orderBy) {
      form.append('orderField', this.orderField)
      form.append('orderBy', this.orderBy)
    }
    this.service.post('admin/get_all_accomplishments', form).then((result: any) => {
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
    this.selectedExp = [];
    this.modalRef = this.modalService.open(modal, { size: 'sm', centered: true })
  }

  fnOpenEditCategoryModal(modal, category, i) {
    this.selectedCategory = category;
    this.selectedCategoryIndex = i;
    this.pleaseWaitBtn = false;
    this.name = JSON.parse(JSON.stringify(category.title));
    this.selectedExp = category.expFlag != null ? JSON.parse(JSON.stringify(category.expFlag))  : [];
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
    if(this.selectedExp.length == 0){
      this.toast.error('Please select a experiance.');
      return false;
    }
    let form = new HttpParams()
    .set('title', this.name)
    .set('jobtitleId',this.jobtitleId)
    .set("expFlag",JSON.stringify(this.selectedExp));
    // form.append('center_id', this.center_id)
    // form.append('type', this.type)
    this.pleaseWaitBtn = true;
    this.service.post('admin/add_accomplishments', form).then((result: any) => {
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
    if(this.selectedExp.length == 0){
      this.toast.error('Please select a experiance.');
      return false;
    }
    let form = new HttpParams()
    .set('title', this.name)
    .set('id', this.selectedCategory._id)
    .set('jobtitleId',this.jobtitleId)
    .set("expFlag",JSON.stringify(this.selectedExp));
    this.pleaseWaitBtn = true;
    this.service.post('admin/update_accomplishments', form).then((result: any) => {
      if (result && result.msg && result.msg != '') {
        this.toast.success(result.msg)
      }
      this.categories[this.selectedCategoryIndex].title = this.name;
      this.categories[this.selectedCategoryIndex].expFlag = this.selectedExp;
    
      this.modalRef.dismiss();
    }, (error: any) => {
      this.pleaseWaitBtn = false;
    })
  }

  fnEnableCategory() {
    let form = new HttpParams().set('id', this.selectedCategory._id)
    this.pleaseWaitBtn = true;
    this.service.post('admin/enable_accomplishments', form).then((result: any) => {
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
    this.service.post('admin/disable_accomplishments', form).then((result: any) => {
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
    this.service.post('admin/delete_accomplishments', form).then((result: any) => {
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
  }
}
