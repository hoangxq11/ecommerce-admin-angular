import { BaseResponse } from "./response";

export class AddressRes implements BaseResponse {
    message!: string;
    data!: AddressData;
}

export class AddressListRes implements BaseResponse {
    message!: string;
    data!: AddressData[];
}

export class AddressData {
    id!: number;
    fullName!: string;
    phoneNumber!: string;
    province!: string;
    district!: string;
    ward!: string;
    content!: string;
    defaultAddress!: boolean;
}

export class AddressReq {
    fullName!: string;
    phoneNumber!: string;
    province!: string;
    district!: string;
    ward!: string
    content!: string;
    defaultAddress!: boolean;
} 

export class Province {
    code!: number;
    codename!: string;
    districts!: District[];
    division_type!: string;
    name!: string;
    phone_code!: number;
}

export class District {
    name!: string;
    code!: number;
    codename!: string;
    division_type!: string;
    province_code!: number;
    wards!: Ward[];
}

export class Ward {
    code!: number;
    codename!: string;
    division_type!: string;
    name!: string;
    short_codename!: string;
}