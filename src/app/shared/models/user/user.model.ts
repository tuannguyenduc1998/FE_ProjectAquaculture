export class User {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items:
    {
      id: string;
      userName: string;
      group: {
        id: string;
        name: string;
        description: string;
        createdAt: number;
        countUsers: number;
        isDefault: true;
        features:
          {
            id: string;
            name: string;
            description: string
          }[];
        users:
          {
            id: string;
            fullName: string;
            phone: string;
            email: string;
            avatar: string;
            address: string;
            updatedDate: number
          }[]
      };
      isActive: true;
      fullName: string;
      email: string;
      phone: string;
      district: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
      };
      commune: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
      };
      province: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
      };
      address: string;
      lastTimeReadNotification: number;
      modifiedAt: number;
      checkSelected?: boolean;
    }[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  extraData: {};
}
