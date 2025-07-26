import { NgModule } from "@angular/core";
import { ProjectsModule } from "src/app/shared/components/projects/projects.module";
import { UserDashboardComponent } from "./user.component";
import { ButtonModule } from "src/app/shared/components/button/button.module";
import { LogoComponent } from "src/app/shared/components/logo/logo.component";
import { AppRoutingModule } from "src/app/app-routing.module";
import { CreateProjectModule } from "src/app/shared/components/create-project/create-project.module";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        ProjectsModule,
        ButtonModule,
        LogoComponent,
        AppRoutingModule,
        CreateProjectModule,
        CommonModule
    ],
    declarations: [
        UserDashboardComponent
    ],
    exports: [
        UserDashboardComponent
    ]
})

export class UserDashboardModule { }