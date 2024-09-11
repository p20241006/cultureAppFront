import {Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {UserService} from "../user/user/user.service";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      fatherSurname: ['', Validators.required],
      matherSurname: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}


  onSubmit(): void {
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.value).subscribe({
        next: () => {
          alert('Registro exitoso. Redirigiendo al login...');
          this.router.navigate(['/login']); // Redirige al login
        },
        error: (error) => {
          console.error('Error al registrar: ', error);
        }
      });
    }
  }
}
