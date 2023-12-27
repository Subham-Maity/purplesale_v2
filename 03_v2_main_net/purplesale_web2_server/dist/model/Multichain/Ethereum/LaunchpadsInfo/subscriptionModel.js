import { Schema, model } from 'mongoose';
const presaleDataSchemaEthereum = new Schema({
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
const SubscriptionDataEthereum = model("SubscriptionDataEthereum", presaleDataSchemaEthereum);
export default SubscriptionDataEthereum;
//# sourceMappingURL=subscriptionModel.js.map