import { Routes } from '@angular/router';

export const driverRoutes: Routes = [
  {
    path: 'view-all',
    loadComponent: () =>
      import('./view-all-drivers/view-all-drivers.component').then(
        (m) => m.ViewAllDriversComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'add-driver',
    loadComponent: () =>
      import('./add-driver/add-driver.component').then(
        (m) => m.AddDriverComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'edit-driver/:id',
    loadComponent: () =>
      import('./edit-driver/edit-driver.component').then(
        (m) => m.EditDriverComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  }
];
