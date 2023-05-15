import { AddressData } from "./address";
import { ProductDetailData } from "./product";
import { ProfileData } from "./profile";
import { BaseResponse } from "./response";

export class BillReq {
    paymentMethod!: string;
    descriptionPay!: string;
    totalAmount!: number;
    addressId!: number;
    shippingServiceId!: number;
}

export class BillListRes implements BaseResponse {
    message!: string;
    data!: BillData[];
}

export class BillRes implements BaseResponse {
    message!: string;
    data!: BillData;
}

export class BillData {
    id!: number;
    status!: string;
    paymentMethod!: string;
    descriptionPay!: string;
    totalAmount!: number;
    paymentTime!: Date;
    address!: AddressData;
    shippingService!: ShippingServiceData;
    orderType!: OrderTypeData;
    productBills!: ProductBillData[];
    profileDto!: ProfileData;
}

export class ShippingServiceData {
    id!: number;
    name!: string;
    cost!: number;
    time!: number;
    description!: string;
}

export class OrderTypeData {
    id!: number;
    name!: string;
    description!: string;
}

export class ProductBillData {
    id!: number;
    productDetail!: ProductDetailData;
    quantity!: number;
}

export class BillCriteria {
    keyWord!: string;
    status!: string;
}