import { DocumentMapping } from './document-mapping';

export class Keyword {
    id!:number;
    name!:string;
    description!:string;
    documemtMappings: DocumentMapping[] = [];
    isDeleting: boolean = false;
}
