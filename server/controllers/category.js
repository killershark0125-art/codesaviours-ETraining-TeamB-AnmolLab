const Category = require("../models/category");
const { generateSlug } = require("../validations/categoryValidation");
const responseHandler = require("../utils/responseHandler");
const {StatusCodes} = require("../consts/statusCode");


const createCategory = async (req, res)=>{
    try{
        const {name, description} = req.body;
        if(!name || !name.trim()){
            return responseHandler(res, StatusCodes.BAD_REQUEST, "Category name is required");
        };
        const slug = generateSlug(name);
        const category = await Category.create({
            name:name.trim(),
            slug,
            description
        });
        return responseHandler(res, StatusCodes.INSERTED, "Category created successfully", category);

    }catch(error){
         console.error("Create category error:", error);
        if (error.code === 11000) {
            return responseHandler(res, StatusCodes.CONFLICT, "Category name already exists");
        }

        return responseHandler(res, StatusCodes.SERVER_ERROR, "Error creating category");
    }
};
 
const getAllCategories = async (req, res)=>{
    try{
        const categories = await Category.find().sort({createdAt: -1});
        return responseHandler(res, StatusCodes.SUCCESS, "Categories fetched successfully",categories, { count: categories.length });
    }catch(error){
        return responseHandler(res, StatusCodes.SERVER_ERROR, "Error fetching categories");
    }
};


const getCategoryById = async (req, res)=>{
    try{
        const {id} = req.params;
        const category = await Category.findById(id);
        if(!category){
            return responseHandler(res, StatusCodes.NOT_FOUND, "Category not found");
        }
        return responseHandler(res, StatusCodes.SUCCESS, "Category fetched successfully", category);
    }catch(error){
        return responseHandler(res, StatusCodes.BAD_REQUEST, "Invalid category ID");
    }
};

const updateCategory = async (req, res)=>{
    try{
        const {name, description, isActive} = req.body;
        const updateData = {};
        if(typeof name !== "undefined"){
            if(!name.trim()){
                return responseHandler(res, StatusCodes.BAD_REQUEST, "Category name must be a valid string");
            }
            updateData.name = name.trim();
            updateData.slug = generateSlug(name);
        }
        if(typeof description !== "undefined"){
            updateData.description = description;
        }
        if(typeof isActive !== "undefined"){
            if(typeof isActive !== "boolean"){
                return responseHandler(res, StatusCodes.BAD_REQUEST, "isActive must be a boolean value");
            }
            updateData.isActive = isActive;
        }

        const category = await Category.findByIdAndUpdate(req.params.id,updateData, {new:true,runValidators:true});
        if(!category){
            return responseHandler(res, StatusCodes.NOT_FOUND, "Category not found");
        }

        return responseHandler(res, StatusCodes.SUCCESS, "Category updated successfully", category);
    }catch(error){
        if (error.code === 11000) {
            return responseHandler(res, StatusCodes.CONFLICT, "Category name already exists");
        }
        return responseHandler(res, StatusCodes.SERVER_ERROR, "Error updating category");   
    }
};


const deleteCategory = async (req, res)=>{
    try{
        const category = await Category.findByIdAndDelete(req.params.id);
        if(!category){
            return responseHandler(res, StatusCodes.NOT_FOUND, "Category not found");
        }
        return responseHandler(res, StatusCodes.SUCCESS, "Category deleted successfully");
    }catch(error){
        return responseHandler(res, StatusCodes.SERVER_ERROR, "Invalid category ID");
    }
}



module.exports = {createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory};