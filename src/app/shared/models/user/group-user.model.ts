export class GroupUser {
    id: string;
    name: string;
    description: string;
    createdAt: number;
    countUsers: number;
    isDefault: boolean;
    features: {
        id: string;
        name: string;
        description: string
    }[];
    users: {
        id: string;
        fullName: string;
        phone: string;
        email: string;
        avatar: string;
        address: string;
        updatedDate: number
    }[];
}
