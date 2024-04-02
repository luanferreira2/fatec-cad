import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  formGroupStudent: FormGroup;
  isEditing: boolean = false;

  ngOnInit(): void {
    this.loadStudent();
  }

  loadStudent() {
    this.service.getStudents().subscribe({
      next: (data) => (this.students = data),
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    private service: StudentsService
  ) {
    this.formGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      course: [''],
    });
  }

  save() {
    if (this.isEditing) {
      this.service.update(this.formGroupStudent.value).subscribe({
        next: () => {
          this.loadStudent();
          this.isEditing = false;
        },
      });
    } else {
      this.service.save(this.formGroupStudent.value).subscribe({
        next: (data) => this.students.push(data),
      });
    }
    this.formGroupStudent.reset();
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudent(),
    });
  }

  edit(student: Student) {
    this.formGroupStudent.setValue(student);
    this.isEditing = true;
  }
}
