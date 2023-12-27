import { Schema, Model, model } from 'mongoose';
import { IPresaleData } from '../../../../types/Launchpads/presaleData.js';

const presaleDataSchemaAvalanche: Schema = new Schema<IPresaleData>({
    id: Number,
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

const PresaleDataAvalanche = model ("PresaleDataAvalanche", presaleDataSchemaAvalanche);

export default PresaleDataAvalanche;
