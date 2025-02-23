import { NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, UntypedFormGroup, Validators, UntypedFormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule, NativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeInRight400ms } from '@vex/animations/fade-in-right.animation';
import { fadeInUp400ms } from '@vex/animations/fade-in-up.animation';
import { scaleIn400ms } from '@vex/animations/scale-in.animation';
import { stagger80ms } from '@vex/animations/stagger.animation';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexSecondaryToolbarComponent } from '@vex/components/vex-secondary-toolbar/vex-secondary-toolbar.component';
import { DriverDataService } from '../_core/services/driver-data.service';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'dg-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrl: './edit-driver.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [stagger80ms, fadeInUp400ms, scaleIn400ms, fadeInRight400ms],
  standalone: true,
  providers: [NativeDateAdapter],
  imports: [
    VexSecondaryToolbarComponent,
    VexBreadcrumbsComponent,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    NgFor,
    MatOptionModule,
    NgIf,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDatepickerModule
  ]
})
export class EditDriverComponent implements OnInit {
 phonePrefixOptions = ['+91'];

  personalInformationFormGroup: UntypedFormGroup = this.fb.group({
    firstName: [null, Validators.required],
    middleName: [null, Validators.required],
    lastName: [null, Validators.required],
    aliasName: [null, Validators.required],
    dateOfBirth: [null, Validators.required],
    email: [null, Validators.required],
    primaryMobilePrefix: [this.phonePrefixOptions[0], Validators.required],
    primaryMobile: [null, Validators.required],
    alternativeMobilePrefix: [this.phonePrefixOptions[0], Validators.required],
    alternativeMobile: [null, Validators.required],
    aadhaarNumber: [null, Validators.required],
    spokenLanguages: [null, Validators.required],
  });

  verticalPasswordFormGroup: UntypedFormGroup = this.fb.group({
    password: [
      null,
      Validators.compose([Validators.required, Validators.minLength(6)])
    ],
    passwordConfirm: [null, Validators.required]
  });

  verticalConfirmFormGroup: UntypedFormGroup = this.fb.group({
    terms: [null, Validators.requiredTrue]
  });

  passwordInputType = 'password';

  constructor(
    private fb: UntypedFormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private driverDataService: DriverDataService
  ) {}

  ngOnInit(): void {
      this.fetchDriverDetailsById();
  }

  fetchDriverDetailsById() {
    this.driverDataService.fetchDriverById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (driverDetails) => {
        console.log(driverDetails);
        // this.verticalAccountFormGroup.patchValue(driverDetails);
      }});
  }

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open(
      'Hooray! You successfully created your account.',
      undefined,
      {
        duration: 5000
      }
    );
  }
}
