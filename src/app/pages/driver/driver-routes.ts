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
      import('./add-edit-driver/add-edit-driver.component').then(
        (m) => m.AddEditDriverComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  },
  {
    path: 'edit-driver/:id',
    loadComponent: () =>
      import('./add-edit-driver/add-edit-driver.component').then(
        (m) => m.AddEditDriverComponent
      ),
    data: {
      toolbarShadowEnabled: false
    }
  }
];
