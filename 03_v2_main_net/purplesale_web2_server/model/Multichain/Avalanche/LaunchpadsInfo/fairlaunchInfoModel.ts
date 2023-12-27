import { Schema, Model, model } from 'mongoose';
import {IFairLaunchData} from '../../../../types/Launchpads/presaleData.js';

const fairLaunchDataSchemaAvalanche: Schema = new Schema<IFairLaunchData>({
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

const FairLaunchDataSchemaAvalanche: Model<IFairLaunchData> = model<IFairLaunchData>("FairLaunchDataAvalanche", fairLaunchDataSchemaAvalanche);

export default FairLaunchDataSchemaAvalanche;
