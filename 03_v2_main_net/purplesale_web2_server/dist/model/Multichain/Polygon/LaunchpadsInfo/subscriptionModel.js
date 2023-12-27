import { Schema, model } from 'mongoose';
const presaleDataSchemaPolygon = new Schema({
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
const SubscriptionDataPolygon = model("SubscriptionDataPolygon", presaleDataSchemaPolygon);
export default SubscriptionDataPolygon;
//# sourceMappingURL=subscriptionModel.js.map