import { SelectionModel } from '@angular/cdk/collections';
import { NgIf, NgFor, NgClass } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, inject, Input, OnInit, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule, ReactiveFormsModule, UntypedFormControl } from '@angular/forms';
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
import { ReplaySubject, Observable, of, filter } from 'rxjs';
import { Driver } from './interfaces/driver.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { aioTableData, aioTableLabels } from 'src/static-data/aio-table-data';


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

  /**
   * Simulating a service with HTTP that returns Observables
   * You probably want to remove this and do all requests in a service with HTTP
   */
  subject$: ReplaySubject<Driver[]> = new ReplaySubject<Driver[]>(1);
  data$: Observable<Driver[]> = this.subject$.asObservable();
  drivers: Driver[] = [];

  @Input()
  columns: TableColumn<Driver>[] = [
    {
      label: 'Checkbox',
      property: 'checkbox',
      type: 'checkbox',
      visible: true
    },
    { label: 'Image', property: 'image', type: 'image', visible: true },
    {
      label: 'Name',
      property: 'name',
      type: 'text',
      visible: true,
      cssClasses: ['font-medium']
    },
    {
      label: 'First Name',
      property: 'firstName',
      type: 'text',
      visible: false
    },
    { label: 'Last Name', property: 'lastName', type: 'text', visible: false },
    { label: 'Contact', property: 'contact', type: 'button', visible: true },
    {
      label: 'Address',
      property: 'address',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Street',
      property: 'street',
      type: 'text',
      visible: false,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Zipcode',
      property: 'zipcode',
      type: 'text',
      visible: false,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'City',
      property: 'city',
      type: 'text',
      visible: false,
      cssClasses: ['text-secondary', 'font-medium']
    },
    {
      label: 'Phone',
      property: 'phoneNumber',
      type: 'text',
      visible: true,
      cssClasses: ['text-secondary', 'font-medium']
    },
    { label: 'Labels', property: 'labels', type: 'button', visible: true },
    { label: 'Actions', property: 'actions', type: 'button', visible: true }
  ];
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  dataSource!: MatTableDataSource<Driver>;
  selection = new SelectionModel<Driver>(true, []);
  searchCtrl = new UntypedFormControl();

  labels = aioTableLabels;

  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort?: MatSort;

  private readonly destroyRef: DestroyRef = inject(DestroyRef);

  constructor(private dialog: MatDialog) {}

  get visibleColumns() {
    return this.columns
      .filter((column) => column.visible)
      .map((column) => column.property);
  }

  /**
   * Example on how to get data and pass it to the table - usually you would want a dedicated service with a HTTP request for this
   * We are simulating this request here.
   */
  getData() {
    return of(aioTableData.map((driver) => new Driver(driver)));
  }

  ngOnInit() {
    this.getData().subscribe((drivers) => {
      this.subject$.next(drivers);
    });

    this.dataSource = new MatTableDataSource();

    this.data$.pipe(filter<Driver[]>(Boolean)).subscribe((drivers) => {
      this.drivers = drivers;
      this.dataSource.data = drivers;
    });

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

  updateDriver(driver: Driver) {
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

  deleteDriver(driver: Driver) {
    /**
     * Here we are updating our local array.
     * You would probably make an HTTP request here.
     */
    this.drivers.splice(
      this.drivers.findIndex(
        (existingDriver) => existingDriver.id === driver.id
      ),
      1
    );
    this.selection.deselect(driver);
    this.subject$.next(this.drivers);
  }

  deleteDrivers(drivers: Driver[]) {
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

  toggleColumnVisibility(column: TableColumn<Driver>, event: Event) {
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

  onLabelChange(change: MatSelectChange, row: Driver) {
    const index = this.drivers.findIndex((c) => c === row);
    this.drivers[index].labels = change.value;
    this.subject$.next(this.drivers);
  }
}
