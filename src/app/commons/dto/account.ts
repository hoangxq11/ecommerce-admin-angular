export class Account {
    id!: string;
    username!: string;
    role!: string;
    email!: string;
}

export class AccountRegister {
    username!: string;
    email!: string;
    authorities!: string[];
    password!: string;
}

export class AccountLogin {
    username!: string;
    password!: string;
}

import { BaseResponse } from "./response";

export class JwtResponse implements BaseResponse{
    message!: string;
    data!:JwtData;
}

export class JwtData{
    token!: string;
    type!: string;
    id!: string;
    username!: string;
    email!: string;
    roles!: string[];
}