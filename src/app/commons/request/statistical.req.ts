import { BaseResponse } from "../dto/response";

export class StatisticalCriteria {
    startDate!: Date;
    endDate!: Date;
    status!: string;
}

export class BillStatusRes implements BaseResponse {
    message!: string;
    data!: BillStatusData;
}

export class BillStatusData {
    pending!: number;
    done!: number;
    shipping!: number;
    canceled!: number;
}

export class CustomerStatisticalRes {
    message!: string;
    data!: CustomerStatisticalData[];
}
export class CustomerStatisticalData {
    accountId!: number;
    username!: string;
    phoneNumber!: string;
    fullName!: string;
    value!: number;
    count!: number;
}

export class ProductStatisticalRes {
    message!: string;
    data!: ProductStatisticalData[];
}
export class ProductStatisticalData {
    id!: number;
    name!: string;
    createdAt!: Date;
    price!: number;
    categoryName!: string;
    value!: number;
}

export class KpiRes {
    message!: string;
    data!: KpiData;
}
export class KpiData {
    revenueFirstSpin!: number;
    revenueSecondSpin!: number;
    revenueThirdSpin!: number;
    revenuePredict!: number;
    revenueNow!: number;
}