import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SelectionModel } from '@angular/cdk/collections';
import { RegisterApiService } from '../../../shared/register.api.service';
import { Student } from '../../../shared/student';

interface MailStatus {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit, AfterViewInit {
  foods: MailStatus[] = [
    {value: 'all', viewValue: 'All'},
    {value: '1', viewValue: 'Success'},
    {value: '0', viewValue: 'Failed'}
  ];
  selectedStatus:string;
  
  
  displayedColumns = [ 'id', 'name', 'progress', 'color'];
  dataSource: MatTableDataSource<Student>;
  selection: SelectionModel<Student>;
  StudentData:any= [];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor( private studentApi: RegisterApiService) {
   
     
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.StudentData);
    this.selection = new SelectionModel<Student>(true, []);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onStatusSelection1() {
    console.log(this.selectedStatus+"manikandan Subramaniyan");
    
      this.studentApi.getMailStatus(this.selectedStatus).subscribe(data => {
        this.StudentData = data;
        console.log(JSON.stringify(data)+"data")
     //   console.log(JSON.stringify(this.StudentData))
     //   this.StudentData=[{"select":"","student_name":"mani","student_email":"test","section":"E","_id":1,"subjects":[],"dob":"","gender":""}]
     // this.StudentData=JSON.stringify(this.StudentData);
        console.log(this.StudentData);
        this.dataSource = new MatTableDataSource<Student>(this.StudentData);
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        
        }, 0);
      })
    
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }
  DeleteData() {  
    debugger;  
    console.log("inside 1")
    const numSelected = this.selection.selected; 
    console.log("===>"+JSON.stringify(numSelected)); 
  if (numSelected.length > 0) {  
        if (confirm("Are you sure to delete items ")) {  
             this.studentApi.sendmail(numSelected).subscribe(result => {  
                 alert(result);  
         //        this.LoadData();  
           })  
        }  
     } else {  
       alert("Select at least one row");  
    } 
}
}
