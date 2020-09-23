// Route API Pet
const express = require("express");
const route = express.Router();
const { verifyToken } = require("../helpers/token");

const {
    getAllData,
    createData,
    detailData,
    updateData,
    findByGender,
    findByLocation,
    findDetailPet,
    filterPet,
    searchPet,
    searchPetCollection,
    filterPetCollection,
    petByCategory,
    filterPetByCategory,
} = require("../controllers/Pet");

route.get("/pet", getAllData);
route.post("/pet/create", verifyToken, createData);
route.get("/pet/filter", filterPet);
route.get("/pet/search", searchPet);
route.get("/pet/breed", searchPetCollection);
route.get("/pet/breed/filter", filterPetCollection);
route.get("/pet/breed/:category/filter", filterPetByCategory);
route.get("/pet/category/:category", petByCategory);
route.get("/pet/:id", detailData);
route.put("/pet/:id", verifyToken, updateData);
route.get("/petgender/", findByGender);
route.get("/petlocation/", findByLocation);
route.get("/petdetail/", findDetailPet);

module.exports = route;
