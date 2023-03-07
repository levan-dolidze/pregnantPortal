import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutComponent } from './layout/layout.component';
import { AppRootComponent } from './app-root/app-root.component';





@NgModule({
    declarations: [
        LayoutComponent,
        AppRootComponent,
        LayoutComponent
    ],

    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],

    exports: [
        ReactiveFormsModule,
        FormsModule
    ]
})

export class SharedModule { }
