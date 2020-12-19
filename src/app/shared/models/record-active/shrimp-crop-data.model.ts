export class ShrimpCropData {
    id: string;
    code: string;
    name: string;
    fromDate: number;
    toDate: number;
    farmingLocation: {
        id: string;
        code: string;
        name: string
    };
    shrimpBreed: {
        id: string;
        code: string;
        name: string;
        description: string;
        attachment: string
    };
    factors: Factor[];
    modifiedAt: number;
}

export class Factor {
    id: string;
    managementFactor: {
        id: string;
        code: string;
        name: string
    };
    curator: {
        id: string;
        fullName: string;
        phone: string;
        email: string;
        avatar: string;
        address: string;
        updatedDate: number
    };
    frequency: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    executionTime: number;
    fromDate: number;
    toDate: number;
    status?: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
    };
    modifiedAt: number;
    shrimpCropId: string;
    isCreateWork: boolean;
}
