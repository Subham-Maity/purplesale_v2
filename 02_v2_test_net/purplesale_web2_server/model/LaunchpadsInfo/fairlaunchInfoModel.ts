import { Schema, Model, model } from 'mongoose';
import {IFairLaunchData} from '../../types/Launchpads/presaleData.js';

const fairLaunchDataSchema: Schema = new Schema<IFairLaunchData>({
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

const FairLaunchDataSchema: Model<IFairLaunchData> = model<IFairLaunchData>("FairLaunchData", fairLaunchDataSchema);

export default FairLaunchDataSchema;
