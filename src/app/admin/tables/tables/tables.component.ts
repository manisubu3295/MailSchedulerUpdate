import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserData, DataService } from '../data.service';
import { SelectionModel } from '@angular/cdk/collections';
import { RegisterApiService } from '../../../shared/register.api.service';
import { Student } from '../../../shared/student';
import {User} from '../../../shared/User';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterViewInit {
  
  displayedColumns = ['select', 'name', 'email', 'mobile', 'country','dob','gender'];
  dataSource: MatTableDataSource<Student>;
  selection: SelectionModel<Student>;
  user:any= [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('TABLE') table: ElementRef;
  subject: string;
  body: string;

  constructor(private readonly dataService: DataService, private studentApi: RegisterApiService,public dialog: MatDialog) {
    this.studentApi.GetUserDetails().subscribe(data => {
      this.user = data;
      console.log(JSON.stringify(data)+"data");
      console.log(this.user);
      this.dataSource = new MatTableDataSource<Student>(this.user);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      
      }, 0);
    }) 
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.user);
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
  sendMail() {  
  //  debugger;  
    console.log("inside 1")
    const numSelected = this.selection.selected; 
    console.log("===>"+JSON.stringify(numSelected)); 
  if (numSelected.length > 0) {  
        if (confirm("Are you sure to send mail ")) {  
             this.studentApi.sendmail(numSelected).subscribe(result => {  
                 alert(result);  
         //        this.LoadData();  
           })  
        }  
     } else {  
       alert("Select at least one row");  
    } 
  }
  openDialog(): void {
    console.log("inside openDialog method")
     this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px'
    });

  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    console.log("inside close")
    this.dialogRef.close();
  }

}
export interface DialogData {
  subject: string;
  body: string;
}
