export class DataManagementFactor {
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
    sampleValue?: string;
    description?: string;
    factorGroup: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    unit?: {
        id: string;
        name: string;
        description: string
    };
    hasData?: boolean;
    modifiedAt?: number;
}

export class ManagementFactor {
    id: string;
    code: string;
    name: string;
}

