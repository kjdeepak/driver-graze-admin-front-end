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
  availableForWorkOptions = [true, false];
  
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

  professionalDetailsFormGroup: UntypedFormGroup = this.fb.group({
    driverCategory: [null, Validators.required],
    licenseTypes: [null, Validators.required],
    licenseNumber: [null, Validators.required],
    licenseExpiryDate: [null, Validators.required],
    totalExperienceInMonths: [null, Validators.required],
    internationalExperience: [null, Validators.required],
    vehicleType: [null, Validators.required],
  });

  locationDetailsFormGroup: UntypedFormGroup = this.fb.group({
    correspondenceAddress: [null, Validators.required],
    pincode: [null, Validators.required],
    state: [null, Validators.required],
    availableForWork: [null, Validators.required],
    additionalSkills: [null],
    professionalReferences: [null]
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
    private driverDataService: DriverDataService,
    private router: Router
  ) {}

  ngOnInit(): void {
      this.fetchDriverDetailsById();
  }

  fetchDriverDetailsById() {
    this.driverDataService.fetchDriverById(this.activatedRoute.snapshot.params['id']).subscribe({
      next: (driverDetails) => {
        console.log(driverDetails);
        // this.verticalAccountFormGroup.patchValue(driverDetails);
        this.personalInformationFormGroup.patchValue({
          firstName: driverDetails.firstName,
          middleName: driverDetails.middleName,
          lastName: driverDetails.lastName,
          aliasName: driverDetails.aliasName,
          dateOfBirth: driverDetails.dateOfBirth,
          email: driverDetails.email,
          primaryMobilePrefix: '+91',
          primaryMobile: driverDetails.mobileNumber,
          alternativeMobilePrefix: '+91',
          alternativeMobile: driverDetails.alternateMobileNumber,
          aadhaarNumber: driverDetails.aadhaarNumber,
          spokenLanguages: driverDetails.spokenLanguages
        });

        this.professionalDetailsFormGroup.patchValue({
          driverCategory: driverDetails.driverCategory,
          licenseTypes: driverDetails.licenseTypes,
          licenseNumber: driverDetails.licenseNumber,
          licenseExpiryDate: driverDetails.licenseExpiryDate,
          totalExperienceInMonths: driverDetails.totalExperienceInMonths,
          internationalExperience: driverDetails.internationalExperience,
          vehicleType: driverDetails.vehicleType
        });

        this.locationDetailsFormGroup.patchValue({
          correspondenceAddress: driverDetails.correspondenceAddress,
          pincode: driverDetails.pincode,
          state: driverDetails.state,
          availableForWork: driverDetails.availableForWork,
          additionalSkills: driverDetails.additionalSkills,
          professionalReferences: driverDetails.professionalReferences
        });
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
      this.driverDataService.updateDriver(this.activatedRoute.snapshot.params['id'], {
      ...this.personalInformationFormGroup.value,
      ...this.professionalDetailsFormGroup.value,
      ...this.locationDetailsFormGroup.value,
      totalExperienceInMonths: +this.professionalDetailsFormGroup.value.totalExperienceInMonths,
    }).subscribe({
      next: () => {
        this.snackbar.open(
          'Driver details updated successfully',
          undefined,
          {
            duration: 5000
          }
        );
        this.router.navigate(['/drivers/view-all']);
      }
    });
  }
}
