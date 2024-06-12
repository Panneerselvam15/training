import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CourseService } from '../service/course.service';

@Component({
  selector: 'app-course-management',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-management.component.css']
})
export class CourseManagementComponent implements OnInit {
  courseForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private courseService: CourseService) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.courseForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      description: ['', Validators.required],
      instructor: ['', Validators.required],
      duration: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      location: ['', Validators.required],
      maxCapacity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  submitCourse(): void {
    if (this.courseForm.valid) {
      const formData = this.courseForm.value;
      
      this.courseService.createCourse(formData).subscribe(
        response => {
          
          console.log('Course created successfully:', response);
          
          this.courseForm.reset();
        },
        error => {
         
          console.error('Error creating course:', error);
          
        }
      );
    } else {
      
      console.log('Form is invalid, cannot submit.');
    }
  }
}

