import { NgModule } from "@angular/core";
import { OnBoardingUserComponent } from "./user.component";
import { InputModule } from "src/app/shared/components/input/input.module";
import { TextareaModule } from "src/app/shared/components/textarea/textarea.module";
import { ButtonModule } from "src/app/shared/components/button/button.module";
import { FormsModule } from "@angular/forms";

@NgModule({
    exports: [
        OnBoardingUserComponent
    ],
    declarations: [
        OnBoardingUserComponent
    ],
    imports: [
        InputModule,
        TextareaModule,
        ButtonModule,
        FormsModule
    ]
})

export class OnBoardingUserModule { }