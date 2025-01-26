import { ViewAllDriversComponent } from './pages/driver/view-all-drivers/view-all-drivers.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

export const appRoutes: VexRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: 'drivers',
      children: [
      {
      path: 'view-all',
      loadComponent: () =>
        import('./pages/driver/view-all-drivers/view-all-drivers.component').then(
          (m) => m.ViewAllDriversComponent
        ),
      data: {
        toolbarShadowEnabled: false
      }
    }]},]
  }
];
