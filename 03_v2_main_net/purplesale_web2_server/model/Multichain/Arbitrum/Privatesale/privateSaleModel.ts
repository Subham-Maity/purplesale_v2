import { Schema, Model, model } from 'mongoose';
import { IPrivateSaleData } from '../../../../types/PrivateSale/privateSaleData.js';

const privateSaleDataSchemaArbitrum: Schema = new Schema<IPrivateSaleData>({
    id: Number,
    title: String,
    logoUrl: String,
    bgLogoUrl: String,
    websiteUrl: String,
    facebook: String,
    twitter: String,
    github: String,
    instagram: String,
    discord: String,
    reddit: String,
    youtube: String,
    description: String,
});

const PrivateSaleDataArbitrum: Model<IPrivateSaleData> = model<IPrivateSaleData>("PrivateSaleDataArbitrum", privateSaleDataSchemaArbitrum);

export default PrivateSaleDataArbitrum;
