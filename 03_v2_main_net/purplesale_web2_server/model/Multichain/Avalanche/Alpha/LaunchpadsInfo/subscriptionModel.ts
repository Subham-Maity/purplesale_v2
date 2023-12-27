import { Schema, Model, model } from 'mongoose';
import { ISubscriptionData } from '../../../../../types/Alpha/Launchpads/presaleData.js';

const presaleDataSchemaAvalanche: Schema = new Schema<ISubscriptionData>({
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

const SubscriptionDataAvalanche: Model<ISubscriptionData> = model<ISubscriptionData>("SubscriptionDataAlphaAvalanche", presaleDataSchemaAvalanche);

export default SubscriptionDataAvalanche;
