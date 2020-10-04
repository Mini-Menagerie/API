// Model for PetCollection
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const petCollectionSchema = new Schema(
    {
        collectionName: {
            type: String,
        },
    },
    { timestamps: true }
);

const PetCollection = mongoose.model("petCollection", petCollectionSchema);

module.exports = PetCollection;
