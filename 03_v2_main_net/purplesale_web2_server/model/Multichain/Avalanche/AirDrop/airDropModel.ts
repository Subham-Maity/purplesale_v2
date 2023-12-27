import { Schema, Model, model } from 'mongoose';
import { IAirDropData } from '../../../../types/AirDrop/AirDropData.js';

const IAirDropDataSchemaAvalanche: Schema = new Schema<IAirDropData>({
    id: Number,
    airdropTitle: String,
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

const IAirDropDataAvalanche: Model<IAirDropData> = model<IAirDropData>("AirDropDataAvalanche", IAirDropDataSchemaAvalanche);

export default IAirDropDataAvalanche;
