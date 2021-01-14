import { Tag } from './tag';

export interface Recipe {
    id: number;
    title: string;
    cookTime: string;
    dateCreated: any;
    dateLastMade: any;
    location: string;
    tags: Tag[];
    notes: string;
    }
