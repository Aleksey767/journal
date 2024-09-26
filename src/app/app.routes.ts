import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JournalComponent } from './components/journal/journal.component';
import { GradesComponent } from './components/grades/grades.component';

const routes: Routes = [{ path: '', redirectTo: '/', pathMatch: 'full' },
{ path: 'journal', component: JournalComponent },
{ path: 'grades', component: GradesComponent }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { static routes = routes; }