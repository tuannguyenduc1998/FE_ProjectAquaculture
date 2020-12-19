import { GenerateItemType } from '../generate-masterdata/generate-itemtype.model';

export class UserData {
  id: string;
  userName: string;
  password: string;
  group: {
    id: string;
    name: string;
    description: string;
    createdAt: number;
    countUsers: number;
    isDefault: true;
    features: {
      id: string;
      name: string;
      description: string;
    }[];
    users: {
      id: string;
      fullName: string;
      phone: string;
      email: string;
      avatar: string;
      address: string;
      updatedDate: number;
    }[];
    groupCode: string;
  };
  isActive: true;
  fullName: string;
  email: string;
  phone: string;
  district: GenerateItemType;
  commune: GenerateItemType;
  province: GenerateItemType;
  address: string;
  modifiedAt: number;
  checkSelected: boolean;
}
