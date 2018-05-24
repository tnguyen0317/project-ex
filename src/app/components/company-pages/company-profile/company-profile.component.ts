import { Component, OnInit } from '@angular/core';
import { Company } from '../../../models/company.model';
import { CompanyService } from '../../../services/company.service';
import { ExamWork } from '../../../models/exam-work.model';
import { Person } from '../../../models/person.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss'],
  providers: [CompanyService]
})
export class CompanyProfileComponent implements OnInit {

  company: Company;
  contact: Person;

  myProfile: boolean = false;

  constructor(private companyService: CompanyService, 
              private router: Router, 
              private auth: UserAuthService,
              private route: ActivatedRoute
            ) { }

  ngOnInit() {

    this.company = new Company('', '', '',  []);

    let _id: string = this.route.snapshot.params['id'];  // tar in hårdkodat id just nu
    if (_id === 'profile') {
      _id = this.auth.getRoleId();
      this.myProfile = true;
    }

    this.companyService.getCompany(_id).subscribe( (resCompData: any) => this.company = resCompData);
  }

  goToExamWork(id) {
    const path = '/company/exam-work/edit-exam-work/' + id;
    this.router.navigateByUrl(path);
  }

  goToUrl() {
    let url: string = '';
    if (!/^http[s]?:\/\//.test(this.company.url)) {
        url += 'http://';
    }

    url += this.company.url;
    window.open(url, '_blank');
  }
}
