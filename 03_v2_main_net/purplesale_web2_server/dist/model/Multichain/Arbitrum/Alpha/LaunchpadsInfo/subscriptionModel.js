import { Schema, model } from 'mongoose';
const presaleDataSchemaArbitrum = new Schema({
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
const SubscriptionDataArbitrum = model("SubscriptionDataAlphaArbitrum", presaleDataSchemaArbitrum);
export default SubscriptionDataArbitrum;
//# sourceMappingURL=subscriptionModel.js.map