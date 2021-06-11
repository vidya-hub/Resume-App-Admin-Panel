import { Component, OnInit } from '@angular/core';
import { CustomeHttpService } from 'src/app/service/custome-http.service';
import { ActivatedRoute } from '@angular/router';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-job-title-sub-data',
	templateUrl: './job-title-sub-data.component.html',
	styleUrls: ['./job-title-sub-data.component.scss']
})
export class JobTitleSubDataComponent implements OnInit {
	loadding = true;
	accomplishments
	affiliations
	certifications
	jobDescription
	skills
	summary
	jobTitle: any;
	constructor(private servics: CustomeHttpService, private activatedRoute: ActivatedRoute) { }

	ngOnInit() {
		this.loadding = true;
		this.activatedRoute.params.subscribe((pramas: any) => {
			var form = new HttpParams().set('jobtitleId', pramas.id)
			this.servics.post('admin/job_title_summary', form).then((result: any) => {
				this.jobTitle = result.data.jobtitle
				this.accomplishments = result.data.accomplishments
				this.affiliations = result.data.affiliations
				this.certifications = result.data.certifications
				this.jobDescription = result.data.jobDescription
				this.skills = result.data.skills
				this.summary = result.data.summary
				this.loadding = false;
			}, (error: any) => {
				this.loadding = false;
			})
		})
		// this.servics.post('').then(() => { }, () => { })
	}

}
