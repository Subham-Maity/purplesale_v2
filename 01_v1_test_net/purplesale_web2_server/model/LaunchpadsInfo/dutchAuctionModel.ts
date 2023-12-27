import { Schema, Model, model } from 'mongoose';
import {IDutchAuctionData} from '../../types/Launchpads/presaleData.js';

const fairLaunchDataSchema: Schema = new Schema<IDutchAuctionData>({
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

const FairLaunchDataSchema: Model<IDutchAuctionData> = model<IDutchAuctionData>("dutchAuctionData", fairLaunchDataSchema);

export default FairLaunchDataSchema;
