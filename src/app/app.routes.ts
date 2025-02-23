import { ViewAllDriversComponent } from './pages/driver/view-all-drivers/view-all-drivers.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';
import { driverRoutes } from './pages/driver/driver-routes';

export const appRoutes: VexRoutes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'drivers',
        children: driverRoutes
      }
    ]
  }
];
