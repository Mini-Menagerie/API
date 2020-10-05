// Controllers for Pet
const Pet = require("../models/Pet");

module.exports = {
    createData: (req, res) => {
        Pet.create(req.body)
            .then((result) => {
                res.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "error",
                    error,
                });
            });
    },
    getAllData: (req, res) => {
        Pet.find()
            .populate({ path: "idCategoryPet" })
            .populate({ path: "idBreed" })
            .then((result) => {
                res.status(200).send({
                    message: "Get all data Pet",
                    result,
                });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).send({
                    message: "Internal server error",
                    error,
                });
            });
    },
    detailData: (req, res) => {
        const { id } = req.params;
        Pet.findOne({
            _id: id,
        })
            .populate({ path: "idCategoryPet" })
            .populate({ path: "idBreed" })
            .populate({ path: "idUser" })
            .then((result) => {
                res.status(200).send({
                    message: "Get all detail data Pet",
                    result,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "Error",
                    error,
                });
            });
    },
    updateData: (req, res) => {
        const { id } = req.params;
        Pet.findOneAndUpdate(
            {
                _id: id,
            },
            req.body
        )
            .then((result) => {
                res.status(200).send({
                    message: "success",
                    result,
                });
            })
            .catch((error) => {
                res.status(400).send({
                    message: "error",
                    error,
                });
            });
    },
    findByGender: async (req, res) => {
        try {
            const result = await Pet.find({
                gender: {
                    $regex: req.query.gender,
                },
            }).populate("idCategoryPet");
            if (result) {
                res.status(200).json({
                    data: result,
                });
            } else {
                res.status(400).json({
                    data: "not found",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    findByLocation: async (req, res) => {
        try {
            const result = await Pet.find({
                location: {
                    $regex: req.query.location,
                    $options: "i",
                },
            }).populate("idCategoryPet");
            if (result) {
                res.status(200).json({
                    data: result,
                });
            } else {
                res.status(400).json({
                    data: "not found",
                });
            }
        } catch (error) {
            console.log(error);
        }
    },
    findDetailPet: async (req, res) => {
        const { search, category } = req.query;
        try {
            let result = await Pet.find({})
                .populate("idCategoryPet")
                .populate("idBreed")
                .populate("idUser");

            let detailPet = await result.map((item) => {
                var pet = {
                    id: item._id,
                    category: item.idCategoryPet.categoryName,
                    breed: item.idBreed.breedName,
                    petName: item.petName,
                    gender: item.gender,
                    age: item.age,
                    weight: item.weight,
                    size: item.size,
                    location: item.location,
                    about: item.about,
                    image: item.image,
                };
                return pet;
                // console.log(pet);
            });

            let firstLetterToUpperCase =
                search.charAt(0).toUpperCase() + search.slice(1);
            let data = detailPet.filter(
                (item) =>
                    item.category === firstLetterToUpperCase ||
                    item.breed === firstLetterToUpperCase ||
                    item.location === firstLetterToUpperCase
            );
            res.status(200).json({
                data,
            });
        } catch (error) {
            console.log(error);
        }
    },
    searchPetCollection: async (req, res) => {
        const { search } = req.query;
        try {
            const result = await Pet.find()
                .populate("idCategoryPet")
                .populate({
                    path: "idBreed",
                    match: {
                        breedName: { $regex: search, $options: "i" },
                    },
                });

            const filterBreed = result.filter((item) => {
                return item.idBreed !== null;
            });

            res.send({ result: filterBreed });
        } catch (error) {
            console.log(error);
        }
    },
    filterPet: async (req, res) => {
        const filter = req.query;
        try {
            console.log(filter);
        } catch (error) {
            console.log(error);
        }
    },
    searchPet: async (req, res) => {
        const { variable } = req.query;

        console.log(variable);

        try {
            const result = await Pet.find({
                $or: [
                    { petName: { $regex: variable, $options: "i" } },
                    { location: { $regex: variable, $options: "i" } },
                ],
            })
                .populate("idCategoryPet")
                .populate("idBreed");

            console.log(result);

            const filterBreed = result.filter((item) => {
                return item.idCategoryPet !== null || item.idBreed !== null;
            });

            res.send({ result });
        } catch (error) {
            console.log(error);
        }
    },
    filterPetCollection: async (req, res) => {
        const { size, gender, alphabet } = req.query;
        try {
            if (size !== "" || gender !== "" || alphabet !== "") {
                const result = await Pet.find({
                    $or: [{ size: size }, { gender: gender }],
                })
                    .populate("idCategoryPet")
                    .populate("idBreed")
                    .sort({ petName: alphabet });

                res.send({ result });
            } else {
                const result = await Pet.find({})
                    .populate("idCategoryPet")
                    .populate("idBreed");

                res.send({ result });
            }
        } catch (error) {
            console.log(error);
        }
    },
    petByCategory: async (req, res) => {
        const { category } = req.params;
        try {
            const result = await Pet.find()
                .populate({
                    path: "idCategoryPet",
                    match: {
                        categoryName: { $regex: category, $options: "i" },
                    },
                })
                .populate("idBreed");

            const filterBreed = result.filter((item) => {
                return item.idCategoryPet !== null;
            });

            res.send({ result: filterBreed });
        } catch (error) {
            console.log(error);
        }
    },
    filterPetByCategory: async (req, res) => {
        const { size, gender, alphabet } = req.query;
        const { category } = req.params;

        try {
            if (size !== "" || gender !== "" || alphabet !== "") {
                const result = await Pet.find({
                    $or: [{ size: size }, { gender: gender }],
                })
                    .populate({
                        path: "idCategoryPet",
                        match: {
                            categoryName: { $regex: category, $options: "i" },
                        },
                    })
                    .populate("idBreed")
                    .sort({ petName: alphabet });

                const filterBreed = result.filter((item) => {
                    return item.idCategoryPet !== null;
                });

                res.send({ result: filterBreed });
            } else {
                const result = await Pet.find()
                    .populate({
                        path: "idCategoryPet",
                        match: {
                            categoryName: { $regex: category, $options: "i" },
                        },
                    })
                    .populate("idBreed");

                const filterBreed = result.filter((item) => {
                    return item.idCategoryPet !== null;
                });

                res.send({ result: filterBreed });
            }
        } catch (error) {
            console.log(error);
        }
    },
    filterPetByCategoryBreed: async (req, res) => {
        const { size, gender, alphabet } = req.query;
        const { breed } = req.params;

        try {
            if (size !== "" || gender !== "" || alphabet !== "") {
                const result = await Pet.find({
                    $or: [{ size: size }, { gender: gender }],
                })
                    .populate("idCategoryPet")
                    .populate({
                        path: "idBreed",
                        match: {
                            breedName: { $regex: breed, $options: "i" },
                        },
                    });

                const filterBreed = result.filter((item) => {
                    return item.idBreed !== null;
                });

                res.send({ result: filterBreed });
            } else {
                const result = await Pet.find()
                    .populate("idCategoryPet")
                    .populate({
                        path: "idBreed",
                        match: {
                            breedName: { $regex: breed, $options: "i" },
                        },
                    });

                const filterBreed = result.filter((item) => {
                    return item.idBreed !== null;
                });

                res.send({ result: filterBreed });
            }
        } catch (error) {
            console.log(error);
        }
    },
};
