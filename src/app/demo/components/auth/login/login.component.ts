import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    responseData: any;

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService,
        private router: Router
    ) {
        localStorage.clear();
    }

    ngOnInit(): void {}

    Login = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
    });

    proceedToLogin() {
        if (this.Login.valid) {
            this.authService.login(this.Login.value).subscribe(
                (result) => {
                    if (result != null) {
                        this.responseData = result;
                        alert(result.message);
                        localStorage.setItem(
                            'token',
                            this.responseData.jwtToken
                        );
                        this.router.navigate(['/asset']);
                    } else {
                        alert('Wrong User or Pass');
                    }
                },
                (error) => {
                    if (error.error && error.error.message) {
                        alert(error.error.message); // Display the server error message
                    } else {
                        alert('An error occurred while logging in.'); // Default error message
                    }
                }
            );
        }
    }
}
