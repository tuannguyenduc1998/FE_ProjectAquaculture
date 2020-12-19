import { FarmingLocationItem } from '../data-source/farming-location/farming-location-item.model';
import { DictionaryItem } from '../master-data/dictionary-item.model';
import { FarmingObject } from '../master-data/farming-object.model';

export class ShrimpCrop {
  id: string;
  code: string;
  name: string;
  fromDate: number;
  toDate: number;
  farmingLocation: FarmingLocationItem;
  shrimpBreed: FarmingObject;
  factors: Factor[];
  modifiedAt: number;
}

export class Factor {
  id: string;
  shrimpCropId?: string;
  isCreateWork?: boolean;
  managementFactor: {
    id: string;
    code: string;
    name: string;
  };
  curator: {
    id: string;
    fullName: string;
    phone: string;
    email: string;
    avatar: string;
    address: string;
    updatedDate: number;
  };
  frequency: DictionaryItem;
  executionTime: number;
  fromDate: number;
  toDate: number;
  status?: DictionaryItem;
  modifiedAt: number;
}
