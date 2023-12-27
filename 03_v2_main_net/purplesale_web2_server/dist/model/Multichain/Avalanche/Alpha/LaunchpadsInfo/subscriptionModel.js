import { Schema, model } from 'mongoose';
const presaleDataSchemaAvalanche = new Schema({
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
const SubscriptionDataAvalanche = model("SubscriptionDataAlphaAvalanche", presaleDataSchemaAvalanche);
export default SubscriptionDataAvalanche;
//# sourceMappingURL=subscriptionModel.js.map