import { Routes } from '@angular/router';

import { Main } from './main/main';
import { PrivacyPolicy } from './main/privacy-policy/privacy-policy';
import { LegalComponent } from './main/legal/legal';

export const routes: Routes = [ 
{ path: '', component: Main, pathMatch: 'full' },
{ path: 'legal', component: LegalComponent}, 
{ path: 'privacy', component: PrivacyPolicy}

];
