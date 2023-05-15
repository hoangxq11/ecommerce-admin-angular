import { AuthService } from "./../../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { AccountLogin, JwtResponse } from "src/app/commons/dto/account";
import { AccountService } from "src/app/services/account.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  accountLogin: AccountLogin = new AccountLogin();
  jwtResponse: JwtResponse = new JwtResponse();
  staticAlertClosed!: boolean;
  error!: string;

  constructor(
    private authService: AuthService,
    private accountService: AccountService,
    private router: Router,
    public toastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this.staticAlertClosed = true;
    if (this.authService.isLoggedIn()) this.router.navigate([""]);
  }

  async authentication() {
    this.accountService.authentication(this.accountLogin).subscribe(
      (data) => {
        console.log(data)
        this.jwtResponse = data;
        if (this.checkRole()) {
          sessionStorage.setItem("jwtToken", JSON.stringify(this.jwtResponse.data));
          this.toastrService.success('Đăng nhập thành công', '', {
            timeOut: 3000,
          });
          this.router.navigate([''])
        } else this.toastrService.error("Tài khoản hoặc mật khẩu không chính xác")
      },
      (error) => {
        this.error = error.error.message;
        this.staticAlertClosed = false;
        this.toastrService.error("Tài khoản hoặc mật khẩu không chính xác")
      }
    );
  }

  checkRole() {
    return this.jwtResponse.data.roles.includes("ROLE_MANAGER")
  }

  onSubmit() {
    this.authentication();
  }

  validate() {
    var form = document.getElementsByClassName('needs-validation')[0] as HTMLFormElement;
    if (form.checkValidity() === false) {
      // event.preventDefault();
      // event.stopPropagation();
    }
    form.classList.add('was-validated');
  }
}
