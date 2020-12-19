import { GenerateItemType } from '../../generate-masterdata/generate-itemtype.model';
import { DataArea } from '../data-area.model';

export class FarmingLocationItem{
  id: string;
    code: string;
    name: string;
    type: GenerateItemType;
    landArea: number;
    area: DataArea;
    description: string;
    attachment: string;
    status: GenerateItemType;
    modifiedAt: number;
}
