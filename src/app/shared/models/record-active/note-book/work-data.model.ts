export class WorkData {
  id: string;
  name: string;
  executionTime: number;
  value: string;
  pictures:
    {
      id: string;
      orgFileName: string;
      orgFileExtension: string;
      fileUrl: string;
      container: string
    }[];
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
  curator: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    avatar: string;
    address: string;
    updatedDate: number
  };
  shrimpCrop: {
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
    hasManagementFactor: boolean
  };
  managementFactor: {
    id: string;
    code: string;
    name: string
  };
  measureUnit: {
    id: string;
    name: string;
    description: string
  };
  modifiedAt: number;
  sampleValue: string;
  description: string;
  mustNotEdit: boolean;
  age: number;
}
