import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-data',
  imports: [FormsModule],
  templateUrl: './employee-data.component.html',
  styleUrl: './employee-data.component.css'
})
export class EmployeeDataComponent implements OnInit {

  @ViewChild('employeeModal') employeeModal : ElementRef | undefined;

  http = inject(HttpClient);

  employeeList: any[] = [];

  employeeObj: any = {
    "employeeId": 0,
    "firstName": "",
    "lastName": "",
    "emailId": "",
    "contactNo": "",
    "city": "",
    "address": ""
  }

  ngOnInit(): void {
    this.getAllEmployee();
  }

  OpenEMPModel()
  {
    if(this.employeeModal){
      this.employeeModal.nativeElement.style.display = "block";
    }
    this.employeeObj = [];

  }

  CloseEMPModel()
  {
    if(this.employeeModal){
      this.employeeModal.nativeElement.style.display = "none";
    }

  }

  getAllEmployee(){
    //https://localhost:7051/api/EmployeeMaster
    this.http.get("http://localhost:5197/api/EmployeeMaster").subscribe((res:any)=>{
      this.employeeList = res;
      console.log(this.employeeList);
    });
  }

  onSave(){
    debugger;
    //console.log(this.employeeObj);
    this.http.post("http://localhost:5197/api/EmployeeMaster", this.employeeObj).subscribe((res:any)=>{
      this.CloseEMPModel();
      this.getAllEmployee();
    });
  }

  deleteEmployee(data: any){
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete){
      this.http.delete("http://localhost:5197/api/EmployeeMaster/" + data.employeeId).subscribe((res:any)=>{
        this.getAllEmployee();
      });
    }
  }

  editEmployee(data: any){
    this.OpenEMPModel();
    this.employeeObj = data;
  }

  onUpdate(){
    this.http.put("http://localhost:5197/api/EmployeeMaster/" + this.employeeObj.employeeId, this.employeeObj).subscribe((res: any)=>{
      this.CloseEMPModel();
      this.getAllEmployee();
    });
  }
}
