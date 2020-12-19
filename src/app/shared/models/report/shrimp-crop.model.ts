export class ShrimpCrop {
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
    hasManagementFactor: boolean;
}
