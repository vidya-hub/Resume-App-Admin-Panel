import { Component, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { CustomeHttpService } from 'src/app/service/custome-http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resumr6',
  templateUrl: './resumr6.component.html',
  styleUrls: ['./resumr6.component.scss']
})
export class Resumr6Component implements OnInit {
  constructor(private service: CustomeHttpService, private activatedRoute: ActivatedRoute) { }
  mainData;

  additionalContacts
  accomplishments
  additionalInformation
  address
  affiliations
  birthDate
  certifications
  city
  education
  email
  firstName
  lastName
  links
  phoneNo
  professionalSummary
  resumeDate
  resumeType
  skills
  state
  workHistory
  zipCode
  ngOnInit() {
    this.activatedRoute.params.subscribe((result: any) => {
      var fd = new HttpParams().set('resumeId', result.id)
      this.service.post('get_single_resume_data', fd).then((result: any) => {
        this.mainData = result.data
        this.additionalContacts = result.data.additionalContacts
        this.accomplishments = result.data.accomplishments
        this.additionalInformation = result.data.additionalInformation
        this.address = result.data.address
        this.affiliations = result.data.affiliations
        this.birthDate = result.data.birthDate
        this.certifications = result.data.certifications
        this.city = result.data.city
        this.education = result.data.education
        this.email = result.data.email
        this.firstName = result.data.firstName
        this.lastName = result.data.lastName
        this.links = result.data.links
        this.phoneNo = result.data.phoneNo
        this.professionalSummary = result.data.professionalSummary
        this.resumeDate = result.data.resumeDate
        this.resumeType = result.data.resumeType
        this.skills = result.data.skills
        this.state = result.data.state
        this.workHistory = result.data.workHistory
        this.zipCode = result.data.zipCode

      }, () => { })
    })
  }


}
