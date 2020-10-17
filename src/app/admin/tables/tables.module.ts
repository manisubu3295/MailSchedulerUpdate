import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TablesRoutingModule } from './tables-routing.module';
import { DialogOverviewExampleDialog, TablesComponent } from './tables/tables.component';
import { DataService } from './data.service';
import { RegisterApiService } from '../../shared/register.api.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTableExporterModule } from 'mat-table-exporter';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    TablesRoutingModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatCheckboxModule,
    MatTableExporterModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
  	MatDialogModule,
    MatExpansionModule
  ],
  declarations: [TablesComponent,DialogOverviewExampleDialog],
  providers: [DataService,RegisterApiService]
})
export class TablesModule {}
