import { Document } from 'mongoose';

export interface IPrivateSaleData extends Document {
    id: number;
    title: string;
    logoUrl?: string;
    bgLogoUrl?: string;
    websiteUrl?: string;
    facebook?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    discord?: string;
    reddit?: string;
    youtube?: string;
    description?: string;
}
