import { ImageRes } from "./image";
import { BaseResponse } from "./response";

export class CategoryListRes implements BaseResponse{
    message!: string;
    data!: CategoryData[];
}

export class CategoryRes implements BaseResponse{
    message!: string;
    data!: CategoryData;
}

export class CategoryData {
    id!: number;
    categoryParent!: CategoryData;
    name!: string;
    image!: ImageRes;
}

export class CategoryReq {
    categoryParentId!: number;
    name!: string;
    imageId!: string;
}