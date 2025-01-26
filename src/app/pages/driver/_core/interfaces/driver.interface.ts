export interface DriverDetails {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  aliasName: string;
  dateOfBirth: string;
  email: string;
  mobileNumber: string;
  alternateMobileNumber: string;
  aadhaarNumber: string;
  spokenLanguages: string[];
  driverCategory: string;
  licenseTypes: string[];
  licenseNumber: string;
  licenseExpiryDate: Date;
  totalExperienceInMonths: number;
  internationalExperience: string;
  vehicleType: string[];
  pincode: string;
  state: string;
  availableForWork: boolean;
  additionalSkills: string;
  professionalReferences: string;
}

export interface DriverDetailsTable {
  id: string;
  name: string;
  aliasName: string;
  spokenLanguages: string;
  driverCategory: string;
  licenseTypes: string;
  totalExperienceInYears: string;
  internationalExperience: string;
  availableForWork: string;
  pincode: string;
  city: string;
}
