import { Document } from 'mongoose';
export interface IPinkLock extends Document {
    id: number;
    title: string;
}