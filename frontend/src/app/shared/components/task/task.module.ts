import { NgModule } from "@angular/core";
import { TaskComponent } from "./task.component";
import { ButtonModule } from "../button/button.module";

@NgModule({
    declarations: [
        TaskComponent
    ],
    exports: [
        TaskComponent
    ],
    imports: [
        ButtonModule
    ]
})

export class TaskModule {}