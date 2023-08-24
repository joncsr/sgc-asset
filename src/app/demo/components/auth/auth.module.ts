import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';

@NgModule({
    imports: [
        CommonModule,
        AuthRoutingModule,


    ]
})
export class AuthModule { }
