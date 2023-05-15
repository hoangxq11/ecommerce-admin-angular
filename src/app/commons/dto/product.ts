import { Time } from "@angular/common";
import { BaseResponse } from "./response";
import { CategoryData } from "./category";
import { ImageRes } from "./image";

export class ProductListRes implements BaseResponse {
    message!: string;
    data!: ProductData[];
}

export class ProductRes implements BaseResponse {
    message!: string;
    data!: ProductData;
}

export class ListProductDetailRes implements BaseResponse {
    message!: string;
    data!: ProductDetailData[];
}

export class ProductDetailData {
    id!: number;
    price!: number;
    countInStock!: number;
    productDto!: ProductData;
    discount!: DiscountData;
    color!: ColorData;
    size!: SizeData;
}

export class ProductData {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    createdAt!: Date;
    category!: CategoryData;
    material!: MaterialData;
    supplier!: SupplierData;
    images!: ImageRes[];
    discount!: DiscountData;
}

export class MaterialData {
    id!: number;
    name!: string;
    description!: string;
}

export class SupplierData {
    id!: number;
    name!: string;
    phoneNumber!: string;
    address!: string;
    note!: string;
}

export class DiscountData {
    id!: number;
    name!: string;
    value!: number;
    endDate!: Date;
}

export class SizeData {
    id!: number;
    name!: string;
}

export class ColorData {
    id!: number;
    name!: string;
}

export class SearchReq {
    keyWord!: string;
}