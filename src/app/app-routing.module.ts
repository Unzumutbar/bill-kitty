import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'bill',
    loadChildren: () => import('./pages/bill-details/bill-details.module').then(m => m.BillDetailsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
