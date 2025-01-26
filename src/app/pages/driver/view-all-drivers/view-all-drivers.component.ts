import { SelectionModel } from '@angular/cdk/collections';
import { NgIf, NgFor, NgClass, formatDate } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  ViewChild
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormsModule,
  ReactiveFormsModule,
  UntypedFormControl
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { stagger40ms } from '@vex/animations/stagger.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexPageLayoutContentDirective } from '@vex/components/vex-page-layout/vex-page-layout-content.directive';
import { VexPageLayoutHeaderDirective } from '@vex/components/vex-page-layout/vex-page-layout-header.directive';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { TableColumn } from '@vex/interfaces/table-column.interface';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { aioTableLabels } from 'src/static-data/aio-table-data';
import { DriverDataService } from '../_core/services/driver-data.service';
import { DriverDetailsTable } from '../_core/interfaces/driver.interface';
import { format } from 'path';

@Component({
  selector: 'dg-view-all-drivers',
  templateUrl: './view-all-drivers.component.html',
  styleUrl: './view-all-drivers.component.scss',
  animations: [fadeInUp400ms, stagger40ms],
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    VexPageLayoutHeaderDirective,
    VexBreadcrumbsComponent,
    MatButtonToggleModule,
    ReactiveFormsModule,
    VexPageLayoutContentDirective,
    NgIf,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatMenuModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgFor,
    NgClass,
    MatPaginatorModule,
    FormsModule,
    MatDialogModule,
    MatInputModule
  ]
})
export class ViewAllDriversComponent implements OnInit, AfterViewInit {
  layoutCtrl = new UntypedFormControl('fullwidth');

  drivers: DriverDetailsTable[] = [];

  @Input()
  columns: TableColumn<DriverDetailsTable>[] = [
    {
      label: 'Checkbox',
      property: 'checkbox',
      type: 'checkbox',
      visible: true
    },
    // { label: 'Image', property: 'image', type: 'image', visible: true },
    {
      label: 'Name',
      property: 'name',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    { label: 'Alias Name', property: 'aliasName', type: 'text', visible: true },
    { label: 'Total Experience', property: 'totalExperienceInYears', type: 'text', visible: true },
    { label: 'International Experience', property: 'internationalExperience', type: 'text', visible: true },
    { label: 'Available for Work', property: 'availableForWork', type: 'text', visible: true, cssClasses: ['font-bold'] },
    // { label: 'Contact', property: 'contact', type: 'button', visible: false },
    // {
    //   label: 'Address',
    //   property: 'address',
    //   type: 'text',
    //   visible: true,
    //   cssClasses: ['text-secondary', 'font-medium']
    // },
    {
      label: 'Spoken Languages',
      property: 'spokenLanguages',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'License Types',
      property: 'licenseTypes',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Pincode',
      property: 'pincode',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'City',
      property: 'city',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },

    // { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<DriverDetailsTable>;
  selection = new SelectionModel<DriverDetailsTable>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(
    private dialog: MatDialog,
    private driverDataService: DriverDataService
  ) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  fetchAllDrivers(): void {
    this.driverDataService.fetchAllDrivers().subscribe((drivers) => {
      const temp = drivers.map((driver) => ({
        id: driver.id,
        name:
          driver.firstName + ' ' + driver.middleName + ' ' + driver.lastName,
        aliasName: driver.aliasName,
        spokenLanguages: driver.spokenLanguages
          .map((language) => language)
          .join(', '),
        driverCategory: driver.driverCategory,
        licenseTypes: driver.licenseTypes
          .map((licenseType) => licenseType)
          .join(', '),
        totalExperienceInYears: (driver.totalExperienceInMonths / 12) + ' years',
        internationalExperience: driver.internationalExperience,
        availableForWork: driver.availableForWork ? 'YES' : 'NO',
        pincode: driver.pincode,
        city: driver.state
      }));
      this.drivers = temp;
      this.dataSource.data = temp;
    });
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource();
    this.fetchAllDrivers();

    this.searchCtrl.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((value) => this.onFilterChange(value));
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }

    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
  }

  refreshTableData(): void {
    this.selection.clear(true);
    this.fetchAllDrivers();
  }

  createDriver() {
    // this.dialog
    //   .open(DriverCreateUpdateComponent)
    //   .afterClosed()
    //   .subscribe((driver: Driver) => {
    //     /**
    //      * Driver is the updated driver (if the user pressed Save - otherwise it's null)
    //      */
    //     if (driver) {
    //       /**
    //        * Here we are updating our local array.
    //        * You would probably make an HTTP request here.
    //        */
    //       this.drivers.unshift(new Driver(driver));
    //       this.subject$.next(this.drivers);
    //     }
    //   });
  }

  updateDriver(driver: DriverDetailsTable) {
    // this.dialog
    //   .open(DriverCreateUpdateComponent, {
    //     data: driver
    //   })
    //   .afterClosed()
    //   .subscribe((updatedDriver) => {
    //     /**
    //      * Driver is the updated driver (if the user pressed Save - otherwise it's null)
    //      */
    //     if (updatedDriver) {
    //       /**
    //        * Here we are updating our local array.
    //        * You would probably make an HTTP request here.
    //        */
    //       const index = this.drivers.findIndex(
    //         (existingDriver) => existingDriver.id === updatedDriver.id
    //       );
    //       this.drivers[index] = new Driver(updatedDriver);
    //       this.subject$.next(this.drivers);
    //     }
    //   });
  }

  deleteDriver(driver: DriverDetailsTable) {
    this.selection.deselect(driver);
    this.driverDataService.deleteDriver(driver.id).subscribe({
      next: () => {
        console.log('Driver deleted');
        this.fetchAllDrivers();
      },
      error: (error) => {
        console.error('There was an error!', error);
      }
    });
  }

  deleteDrivers(drivers: DriverDetailsTable[]) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    drivers.forEach((c) => this.deleteDriver(c));
  }

  onFilterChange(value: string) {
    if (!this.dataSource) {
      return;
    }
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  toggleColumnVisibility(
    column: TableColumn<DriverDetailsTable>,
    event: Event
  ) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    column.visible = !column.visible;
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
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }

  trackByProperty<T>(index: number, column: TableColumn<T>) {
    return column.property;
  }

  // onLabelChange(change: MatSelectChange, row: DriverDetailsTable) {
  //   const index = this.drivers.findIndex((c) => c === row);
  //   this.drivers[index].labels = change.value;
  //   this.subject$.next(this.drivers);
  // }
}
