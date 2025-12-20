import { Routes } from '@angular/router';

import { SayHi } from './say-hi/say-hi';
import { PrivacyPolicy } from './say-hi/privacy-policy/privacy-policy';
import { Legal } from './say-hi/legal/legal';
import { Footer } from './say-hi/footer/footer';

export const routes: Routes = [ 
{ path: '', redirectTo: 'sayhi', pathMatch: 'full' },
{ path: 'sayhi', component: SayHi, 
    children: [ 
        { path: 'impressum', component: Legal, outlet: 'legal' }, 
        { path: 'privacy-policy', component: PrivacyPolicy, outlet: 'legal'} ] }

];
