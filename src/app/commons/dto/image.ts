import { BaseResponse } from "./response";

export class ImageRes {
    id!: string;
    imageUrl!: string;
    title!: string;
}

export class ImageListRes implements BaseResponse {
    data!: string[];
    message!: string;
}