import { Schema, Model, model } from 'mongoose';
import { IPresaleData } from '../../../types/Alpha/Launchpads/presaleData.js';

const presaleDataSchema: Schema = new Schema<IPresaleData>({
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

const PresaleData = model ("PresaleDataAlpha", presaleDataSchema);

export default PresaleData;
