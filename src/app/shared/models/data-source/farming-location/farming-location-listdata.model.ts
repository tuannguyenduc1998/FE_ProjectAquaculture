export class FarmingLocationListData {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  items:
    {
      id: string;
      code: string;
      name: string;
      type: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
      };
      landArea: number;
      description: string;
      attachment: string;
      area: {
        id: string;
        name: string;
        code: string;
        landArea: number;
        address: string
      };
      hasShrimpCrop: true;
      status: {
        key: string;
        value: string;
        displayText: string;
        code: string;
        typeGroup: string
      };
      modifiedAt: number
    }[];
  hasPreviousPage: true;
  hasNextPage: true;
  extraData: {};
}
