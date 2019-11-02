import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const calculatorPath = 'calculator';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: calculatorPath
  },
  {
    path: calculatorPath,
    loadChildren: () => import('./calculator/calculator.module').then(m => m.CalculatorModule)
  },
  {
    path: '**',
    redirectTo: calculatorPath
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
