export class ManagementFactorFilter {
    pageIndex: number;
    pageSize: number;
    totalCount: number;
    totalPages: number;
    items: {
        id: string;
        code: string;
        name: string;
        dataType: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        sampleValue: string;
        description: string;
        factorGroup: {
            key: string;
            value: string;
            displayText: string;
            code: string;
            typeGroup: string
        };
        unit: {
            id: string;
            name: string;
            description: string
        };
        hasData: boolean;
        modifiedAt: number
    }[];
    hasPreviousPage: boolean;
    hasNextPage: boolean;
    extraData: {};
}

export class ManagementFactorItems {
    id: string;
    code: string;
    name: string;
    dataType: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    sampleValue: string;
    description: string;
    factorGroup: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    unit: {
        id: string;
        name: string;
        description: string
    };
    hasData: boolean;
    modifiedAt: number;
}

export class ManagementFactorFilterParams {
    searchKey: string;
    dataType: string;
    factorGroup: string;
}

