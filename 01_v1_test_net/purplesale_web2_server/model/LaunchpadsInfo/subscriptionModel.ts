import { Schema, Model, model } from 'mongoose';
import { ISubscriptionData } from '../../types/Launchpads/presaleData.js';

const presaleDataSchema: Schema = new Schema<ISubscriptionData>({
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

const SubscriptionData: Model<ISubscriptionData> = model<ISubscriptionData>("SubscriptionData", presaleDataSchema);

export default SubscriptionData;
