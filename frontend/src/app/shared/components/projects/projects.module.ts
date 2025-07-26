import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ProjectsComponent } from "./projects.component";
import { ProjectModule } from "../project/project.module";
import { ButtonModule } from "../button/button.module";

@NgModule({
    imports: [
        CommonModule,
        ProjectModule,
        ButtonModule
    ],
    declarations: [
        ProjectsComponent
    ],
    exports: [
        ProjectsComponent
    ]
})

export class ProjectsModule {}