import { Schema, model } from 'mongoose';
const presaleDataSchema = new Schema({
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
const SubscriptionData = model("SubscriptionDataAlpha", presaleDataSchema);
export default SubscriptionData;
//# sourceMappingURL=subscriptionModel.js.map