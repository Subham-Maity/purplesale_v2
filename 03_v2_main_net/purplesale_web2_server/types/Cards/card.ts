import { Document } from 'mongoose';
export interface ICart extends Document {
    Name: string;
    Symbol: string;
    Link: string;
    WalletAddress: string;
    imgHref: string;
    bgLogoUrl?: string;
}
