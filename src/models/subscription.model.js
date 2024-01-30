import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
    {
        subscribers: {
            type: Schema.Types.ObjectId,    // One who is subscribing
            ref: "User"
        },
        channel: {
            type: Schema.Types.ObjectId,    // One to who the subscriber is subscribing
            ref: "User"
        },
    },
    { timestamps: true }
);

export const Subscription = mongoose.model("Subscription", subscriptionSchema);