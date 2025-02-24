import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DriverDetails } from '../interfaces/driver.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DriverDataService {
  constructor(private httpClient: HttpClient) {}

  fetchAllDrivers(): Observable<DriverDetails[]> {
    return this.httpClient.get<DriverDetails[]>(environment.baseUrl + '/drivers');
  }

  fetchDriverById(id: string): Observable<DriverDetails> {
    return this.httpClient.get<DriverDetails>(environment.baseUrl + '/drivers/' + id);
  }

  createDriver(driver: any): Observable<DriverDetails> {
    return this.httpClient.post<DriverDetails>(environment.baseUrl + '/drivers', driver);
  }

  updateDriver(id: string, driver: DriverDetails): Observable<DriverDetails> {
    return this.httpClient.patch<DriverDetails>(environment.baseUrl + '/drivers/' + id, driver);
  }

  deleteDriver(id: string): Observable<void> {
    return this.httpClient.delete<void>(environment.baseUrl + '/drivers/' + id);
  }
}
