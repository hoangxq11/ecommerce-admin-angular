import { Time } from "@angular/common";

export class CreateCustomProductReq {
    name!: string;
    description!: string;
    categoryId!: number;
    materialStr!: string;
    supplierStr!: string;
    imageUUIDs!: string[];
}

export class ProductDetailReq {
    price!: number;
    countInStock!: number;
    productId!: number;
    discountValue!: number;
    discountEndDate!: Date;
    colorStr!: string;
    sizeStr!: string;
}