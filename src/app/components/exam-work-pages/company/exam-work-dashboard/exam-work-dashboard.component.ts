import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamWork } from '../../../../models/exam-work.model';
import { Person } from '../../../../models/person.model';
import { Company } from '../../../../models/company.model';
import { ExamworkService } from '../../../../services/examwork.service';
import { ProgressBarComponent } from '../../../misc/progress-bar/progress-bar.component';
import * as moment from 'moment';
import { StudentService } from '../../../../services/student.service';
import { Student } from '../../../../models/student.model';
import { SimpleTagComponent } from '../../../misc/simple-tag/simple-tag.component';
import { User } from '../../../../models/user.model';

@Component({
 selector: 'app-exam-work-dashboard',
 templateUrl: './exam-work-dashboard.component.html',
 styleUrls: ['./exam-work-dashboard.component.scss'],
 providers: [ExamworkService, StudentService]
})
export class ExamWorkDashboardComponent implements OnInit {
 @ViewChild(ProgressBarComponent) progressBar: ProgressBarComponent;
 @ViewChild(SimpleTagComponent) tagComp;

 examWorkId: String;
 examWork: ExamWork;
 students: Array<Student> = [];
 sortedStudents: Array<Student> = [];
 showLimit: number = 5;
 showMoreBtn: boolean = false;
 tagSkills: Array<String> = [];


 user: User;
 constructor(
   private examService: ExamworkService,
   private studentService: StudentService,
   private activatedRoute: ActivatedRoute,
   private router: Router,
   private modalService: BsModalService,
   private location: Location
 ) {
   this.examWorkId = this.activatedRoute.snapshot.params['id'];
   this.examWork = new ExamWork('', '', [], [], '', '', '',
   new Person('', '', '', ''), '',
   new Company('', '', '', [])
);
      
   this.user = new User('', '', '', '','');
 }

  ngOnInit() {


 getExamWork(){
  this.examService.getExamWork(this.examWorkId)
  .subscribe((fetchedExamWork: any) => {
    this.examWork = fetchedExamWork;

    //Initiera tags med examensarbetens essentialskills
    for(let i = 0; i < this.examWork.essentialSkills.length; i++) {
        this.tagComp.skills.push(this.examWork.essentialSkills[i]);
    }
     
    this.tagSkills = this.tagComp.skills;
  });
 }

 getAllStudents(){
       
  this.studentService.getStudents()
  .subscribe(((fetchedStudents: any) => {
    this.students = fetchedStudents;
    this.sortedStudents = fetchedStudents;

}));
 }

 ngOnInit() {
  
    this.getExamWork();

    this.getAllStudents();

      //TODO: byt ut denna mot vem som är inloggad.
      if (document.URL.includes('company')) {
       this.user.role = 'company';
     } else {
       this.user.role = 'student';
     }
   this.goToPathBasedOnUserRole(this.user._id, this.examWorkId)

 }

 showMoreStudents() {
  this.showLimit += 5;

}

 updateSkills(){
   this.tagSkills = [];
   this.tagSkills = this.tagComp.skills;
 }

 goToPathBasedOnUserRole(roleId, exWorkId) {
   let path;
   if (this.user.role === 'student') {
     path = '/student/view-exam-work/' + exWorkId;
     this.router.navigateByUrl(path);
   }
 }
}



