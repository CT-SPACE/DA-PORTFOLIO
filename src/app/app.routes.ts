import { Routes } from '@angular/router';

import { SayHi } from './say-hi/say-hi';
import { PrivacyPolicy } from './say-hi/privacy-policy/privacy-policy';
import { LegalComponent } from './say-hi/legal/legal';

export const routes: Routes = [ 
{ path: '', redirectTo: 'sayhi', pathMatch: 'full' },
{ path: 'sayhi', component: SayHi, 
    children: [ 
        { path: 'legal', component: LegalComponent, outlet: 'legal' }, 
        { path: 'privacy-policy', component: PrivacyPolicy, outlet: 'legal'} ] }

];
