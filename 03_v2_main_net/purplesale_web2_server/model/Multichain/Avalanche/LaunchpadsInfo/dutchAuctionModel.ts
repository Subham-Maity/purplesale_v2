import { Schema, Model, model } from 'mongoose';
import {IDutchAuctionData} from '../../../../types/Launchpads/presaleData.js';

const fairLaunchDataSchemaAvalanche: Schema = new Schema<IDutchAuctionData>({
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

const FairLaunchDataSchemaAvalanche: Model<IDutchAuctionData> = model<IDutchAuctionData>("dutchAuctionDataAvalanche", fairLaunchDataSchemaAvalanche);

export default FairLaunchDataSchemaAvalanche;
