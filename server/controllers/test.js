const Test = require("../models/test");
const Category = require("../models/category");
const {generateTestSlug, validateTestData} = require("../validations/testValidation");
const {StatusCodes} = require("../consts/statusCode");
const responseHandler = require("../utils/responseHandler");
const csv = require("csv-parser");
const { Readable } = require("stream");
 

const createTest = async (req, res) => {
    try{
        const {name,description,category,sampleType,preparationInstructions,turnaroundTime,price,priceStatus} = req.body;
        const validation = validateTestData(req.body);

        if(!validation.isValid){
            return responseHandler(res, StatusCodes.BAD_REQUEST, "Validation failed", null, {errors: validation.errors});
        }
        const categoryExists = await Category.findById(category);
        if(!categoryExists){
            return responseHandler(res, StatusCodes.NOT_FOUND, "Category not found");
        }
        const slug = generateTestSlug(name);
        const test = await Test.create({
            name:name.trim(),
            slug,
            description,
            category,
            sampleType,
            preparationInstructions,
            turnaroundTime,
            price,
            priceStatus
        });
        return responseHandler(res, StatusCodes.INSERTED, "Test created successfully", test);
    }catch(error){
        console.error("Create test error:", error);
        if (error.code === 11000) {
            return responseHandler(res, StatusCodes.CONFLICT, "Test name already exists");
        }
        if(error.name === "CastError"){
            return responseHandler(res, StatusCodes.BAD_REQUEST, "Invalid category ID");
        }
        return responseHandler(res, StatusCodes.SERVER_ERROR, "Internal server error");
    }
};

const getAllTests = async(req,res)=>{
    try{
         const {search,category,page = 1,limit = 10} = req.query;
         const pageNumber = Math.max(1, parseInt(page, 10) || 1);
         const limitNumber = Math.min(100,Math.max(1, parseInt(limit, 10) || 10));
         const filter = {isActive: true };
         if (search && search.trim()) {

         const escapedSearch = search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
               filter.$or = [
                   { name: { $regex: escapedSearch, $options: "i" } },
                   { code: { $regex: escapedSearch, $options: "i" } }
                            ];
               };
        if (category) {
            if (!require("mongoose").Types.ObjectId.isValid(category)) {
                return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid category ID");
            }
            filter.category = category;
        };
        const skip = (pageNumber - 1) * limitNumber;
        const [tests, totalTests] = await Promise.all([Test.find(filter)
                .populate("category", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limitNumber),

            Test.countDocuments(filter)
        ]);
         const totalPages = Math.ceil(totalTests / limitNumber);

          return responseHandler(res,StatusCodes.SUCCESS,"Tests fetched successfully",
            {
                tests,
                pagination: {
                    totalTests,
                    currentPage: pageNumber,
                    totalPages,
                    limit: limitNumber
                }
            }
        );

    }catch(error){
         console.error("Get all tests error:", error);
         return responseHandler(res, StatusCodes.SERVER_ERROR, "Internal server error");
    }
};

const getTestById = async(req,res)=>{
    try{
        const {id} = req.params;
        if(!require("mongoose").Types.ObjectId.isValid(id)){
            return responseHandler(res, StatusCodes.BAD_REQUEST, "Invalid test ID");
        }
        const test = await Test.findOne({
            _id: id,
            isActive: true 
        })
        .populate("category","name");
        if(!test){
            return responseHandler(res, StatusCodes.NOT_FOUND, "Test not found");
        }
        return responseHandler(res, StatusCodes.SUCCESS, "Test fetched successfully", test);
    }catch(error){
        console.error("Get test by ID error:", error);
        return responseHandler(res, StatusCodes.SERVER_ERROR, "Internal server error");
    }
};


const updateTest = async (req, res) => {
    try {
        const { id } = req.params;
        const mongoose = require("mongoose");

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid test ID");
        }

        const existingTest = await Test.findById(id);

        if (!existingTest) {
            return responseHandler(res,StatusCodes.NOT_FOUND,"Test not found");
        }

        if (Object.keys(req.body).length === 0) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"No update data provided");
        }

        const updatedData = {
            ...existingTest.toObject(),
            ...req.body
        };

        const validation = validateTestData(updatedData);

        if (!validation.isValid) {
            return responseHandler(res,StatusCodes.BAD_REQUEST,"Validation failed",null,{ errors: validation.errors });
        }

        if (req.body.category) {
            if (!mongoose.Types.ObjectId.isValid(req.body.category)) {
                return responseHandler(res,StatusCodes.BAD_REQUEST,"Invalid category ID");
            }

            const categoryExists = await Category.findById(req.body.category);

            if (!categoryExists) {
                return responseHandler(res,StatusCodes.NOT_FOUND,"Category not found");
            }
        }

        const updateData = { ...req.body };

        if (req.body.name) {
            updateData.name = req.body.name.trim();
            updateData.slug = generateTestSlug(req.body.name);
        }

        const test = await Test.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate("category", "name");

        return responseHandler(res,StatusCodes.SUCCESS,"Test updated successfully",test);

    } catch (error) {
        console.error("Update test error:", error);

        if (error.code === 11000) {
            return responseHandler(res,StatusCodes.CONFLICT,"Test name already exists");
        }

        return responseHandler(res,StatusCodes.SERVER_ERROR,"Internal server error"
        );
    }
};


const deleteTest = async(req,res)=>{
    try{
        const { id } = req.params;
        if(!require("mongoose").Types.ObjectId.isValid(id)){
            return responseHandler(res, StatusCodes.BAD_REQUEST, "Invalid test ID");
        }
         const test = await Test.findByIdAndDelete(id);
         if(!test){
            return responseHandler(res, StatusCodes.NOT_FOUND, "Test not found");
         }
            return responseHandler(res, StatusCodes.SUCCESS, "Test deleted successfully");
    }catch(error){
         console.error("Delete test error:", error);
            return responseHandler(res, StatusCodes.SERVER_ERROR, "Internal server error");
    }
};


const importTestsFromCSV = async (req, res) => {
    try {
        if (!req.file) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                "Please upload a CSV file"
            );
        }

        const rows = [];

        await new Promise((resolve, reject) => {
            Readable.from(req.file.buffer)
                .pipe(csv())
                .on("data", (row) => rows.push(row))
                .on("end", resolve)
                .on("error", reject);
        });

        if (rows.length === 0) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                "CSV file is empty"
            );
        }

        const requiredColumns = ["name","description","categoryId","sampleType","preparationInstructions","turnaroundTime","price","priceStatus","isActive"];

        const missingColumns = requiredColumns.filter(
            (column) => !Object.keys(rows[0]).includes(column)
        );

        if (missingColumns.length > 0) {
            return responseHandler(
                res,
                StatusCodes.BAD_REQUEST,
                "Missing required CSV columns",
                null,
                { missingColumns }
            );
        }

        const report = {
            totalRows: rows.length,
            imported: 0,
            duplicates: 0,
            invalid: 0,
            errors: []
        };

        for (let index = 0; index < rows.length; index++) {
            const row = rows[index];
            const rowNumber = index + 2;

            try {
                const name = row.name?.trim();
                const categoryId = row.categoryId?.trim();
                const priceStatus = row.priceStatus?.trim();
                const isActive = row.isActive?.trim().toLowerCase();

                if (!name || !categoryId) {
                    throw new Error("Name and categoryId are required");
                }

                if (!["pending", "confirmed"].includes(priceStatus)) {
                    throw new Error("Invalid priceStatus");
                }

                if (!["true", "false"].includes(isActive)) {
                    throw new Error("isActive must be true or false");
                }

                if (!require("mongoose").Types.ObjectId.isValid(categoryId)) {
                    throw new Error("Invalid category ID");
                }

                const categoryExists = await Category.findById(categoryId);

                if (!categoryExists) {
                    throw new Error("Category not found");
                }

                let price = null;

                if (row.price?.trim() !== "") {
                    price = Number(row.price);

                    if (!Number.isFinite(price) || price < 0) {
                        throw new Error("Invalid price");
                    }
                }

                if (priceStatus === "confirmed" && price === null) {
                    throw new Error("Confirmed price is required");
                }

                if (priceStatus === "pending" && price !== null) {
                    throw new Error("Pending price must be blank");
                }

                const slug = generateTestSlug(name);

                const existingTest = await Test.findOne({
                    $or: [
                        { name: { $regex: `^${name}$`, $options: "i" } },
                        { slug }
                    ]
                });

                if (existingTest) {
                    report.duplicates++;
                    report.errors.push({
                        row: rowNumber,
                        name,
                        reason: "Test already exists"
                    });
                    continue;
                }

                await Test.create({
                    name,
                    slug,
                    description: row.description?.trim() || "",
                    category: categoryId,
                    sampleType: row.sampleType?.trim() || "",
                    preparationInstructions:
                        row.preparationInstructions?.trim() || "",
                    turnaroundTime: row.turnaroundTime?.trim() || "",
                    price,
                    priceStatus,
                    isActive: isActive === "true"
                });

                report.imported++;

            } catch (error) {
                if (error.code === 11000) {
                    report.duplicates++;
                } else {
                    report.invalid++;
                }

                report.errors.push({
                    row: rowNumber,
                    name: row.name || "",
                    reason: error.message
                });
            }
        }

        return responseHandler(res,StatusCodes.SUCCESS,"CSV import completed",report);

    } catch (error) {
        console.error("CSV import error:", error);

        return responseHandler(res,StatusCodes.BAD_REQUEST,"Unable to process CSV file");
    }
};


module.exports = {createTest,getAllTests,getTestById,updateTest,deleteTest, importTestsFromCSV};