export class WorkHistoryData {
  fieldName: string;
  oldValue: string;
  newValue: string;
  modifiedAt: number;
  modifiedBy: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    avatar: string;
    address: string;
    updatedDate: number
  };
}
