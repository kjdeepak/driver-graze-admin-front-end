export class Driver {
  id: number;
  imageSrc: string;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: number;
  city: string;
  phoneNumber: string;
  mail: string;
  labels: any;
  notes: string;

  constructor(driver: any) {
    this.id = driver.id;
    this.imageSrc = driver.imageSrc;
    this.firstName = driver.firstName;
    this.lastName = driver.lastName;
    this.street = driver.street;
    this.zipcode = driver.zipcode;
    this.city = driver.city;
    this.phoneNumber = driver.phoneNumber;
    this.mail = driver.mail;
    this.labels = driver.labels;
    this.notes = driver.notes;
  }

  get name() {
    let name = '';

    if (this.firstName && this.lastName) {
      name = this.firstName + ' ' + this.lastName;
    } else if (this.firstName) {
      name = this.firstName;
    } else if (this.lastName) {
      name = this.lastName;
    }

    return name;
  }

  set name(value) {}

  get address() {
    return `${this.street}, ${this.zipcode} ${this.city}`;
  }

  set address(value) {}
}
