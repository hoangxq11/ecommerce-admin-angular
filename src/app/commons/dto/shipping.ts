import { BaseResponse } from "./response";

export class ShippingServiceListRes implements BaseResponse {
    message!: string;
    data!: ShippingServiceData[];
}

export class ShippingServiceData {
    id!: number;
    name!: string;
    cost!: number;
    time!: number;
    description!: string;
}