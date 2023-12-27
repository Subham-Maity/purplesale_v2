import { Schema, Model, model } from 'mongoose';
import {IFairLaunchData} from '../../../types/Alpha/Launchpads/presaleData.js';

const fairLaunchDataSchemaAlpha: Schema = new Schema<IFairLaunchData>({
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

const FairLaunchDataSchemaAlpha: Model<IFairLaunchData> = model<IFairLaunchData>("FairLaunchDataAlpha", fairLaunchDataSchemaAlpha);

export default FairLaunchDataSchemaAlpha;
