import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzSelectModule} from "ng-zorro-antd/select";
import {UserService} from "../../app/services/user/user.service";
import {filter} from "rxjs";
import {DataState} from "../../app/model/core/stateful-data.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-page',
  standalone: true,
  imports: [ReactiveFormsModule, NzButtonModule, NzCheckboxModule, NzFormModule, NzInputModule, NzSelectModule],
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.scss'
})
export class SignupPageComponent {

  private readonly formBuilder: FormBuilder = inject(FormBuilder);
  private readonly userService: UserService = inject(UserService);
  private readonly router: Router = inject(Router);

  public form!: FormGroup;

  constructor() {
    this.form = this.formBuilder.group({
      email: [''],
      password: [''],
      checkPassword: [''],
      firstName: [''],
      lastName: [''],
      agree: [false]
    });

    this.userService.user$.pipe(filter(userState => userState.state === DataState.LOADED)).subscribe(userState => {
      console.log('User created successfully:', userState.data);
      this.router.navigate(['/new']);
    });
  }

  public onSubmit() {
    this.userService.createUser({
      email: this.form.get('email')?.value,
      password: this.form.get('password')?.value,
      firstName: this.form.get('firstName')?.value,
      lastName: this.form.get('lastName')?.value
    });

  }
}
