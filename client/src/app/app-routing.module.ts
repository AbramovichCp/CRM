import { NgModule } from "../../node_modules/@angular/core";
import { RouterModule, Routes } from "../../node_modules/@angular/router";
import { AuthLayoutComponent } from "./shared/layouts/auth-layout/auth-layout.component";
import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component";
import { LoginPageComponent } from "./login-page/login-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { AuthGuard } from "./shared/classes/auth.guard";

const routes: Routes = [
    {
        path: '', component: AuthLayoutComponent, children: [
            {path: '', redirectTo: '/login', pathMatch: 'full'},
            {path: 'login', component: LoginPageComponent},
            {path: 'register', component: RegisterPageComponent}
        ]
    },
    {
        path: '', component: SiteLayoutComponent, canActivate: [AuthGuard], children: [
            
        ]
    }    
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}