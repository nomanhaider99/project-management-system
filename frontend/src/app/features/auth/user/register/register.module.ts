import { NgModule } from "@angular/core";
import { PasswordInputModule } from "../../password-input/password-input.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { ButtonModule } from "src/app/shared/components/button/button.module";
import { RegisterComponent } from "./register.component";
import { InputModule } from "src/app/shared/components/input/input.module";

@NgModule({
    imports: [
        PasswordInputModule,
        FormsModule,
        CommonModule,
        BrowserModule,
        ReactiveFormsModule,
        ButtonModule,
        InputModule, 
        PasswordInputModule,
    ],
    providers: [],
    exports: [
        RegisterComponent
    ],
    declarations: [
        RegisterComponent
    ]
})

export class RegisterModule {}