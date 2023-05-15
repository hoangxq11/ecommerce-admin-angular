import { BaseResponse } from "./response";

export class ProfileListRes implements BaseResponse{
    message!: string;
    data!: ProfileData[];
}

export class ProfileRes implements BaseResponse{
    message!: string;
    data!: ProfileData;
}

export class ProfileData {
    id!: number;
    fullName!: string;
    phoneNumber!: string;
    dateOfBirth!: Date;
    gender!: string;
    address!: string;
    accountDto!: AccountData;
} 

export class AccountData {
    id!: number;
    username!: string;
    email!: string;
    rank!: RankData;
}

export class RankData {
    id!: number;
    name!: string;
    content!: string;
}