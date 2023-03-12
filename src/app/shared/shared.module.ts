import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppRootComponent } from './app-root/app-root.component';
import { CustomMaterialModule } from '../custom-material/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from '../auth/auth.component';



@NgModule({
    declarations: [
        AppRootComponent,
        LayoutComponent

    ],

    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,
        CustomMaterialModule,

    ],

    exports: [
        CommonModule,
        CustomMaterialModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule,





    ]
})

export class SharedModule { }
