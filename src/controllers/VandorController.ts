import { Request,Response,NextFunction } from "express";
import { EditVandorInputs, VandorLoginInputs } from "../dto/Vandor.dto";
import { FindVandor } from "./AdminController";
import { GenerateSignature, ValidatePassword } from "../utility";
import { CreateFoodInputs } from "../dto/Food.dto";
import { Food } from "../models";

export const VandorLogin = async (req: Request, res: Response, next: NextFunction)=>{
    const { email, password } = <VandorLoginInputs>req.body;
    
    const existingVandor = await FindVandor("", email);

    if (existingVandor !== null) {
        //validation and give access login
        const validation = await ValidatePassword(password,existingVandor.password,existingVandor.salt)
        
        if (validation) {
            const signature = GenerateSignature({
                _id: existingVandor.id,
                email: existingVandor.email,
                foodTypes: existingVandor.foodType,
                name:existingVandor.name
            })
            return res.json(signature)
        }

        return res.json({"message":"Password is not valid"})
    }

    return res.json({"message":"login credential not valid"})
}

export const GetVandorProfile = async (req: Request, res: Response, next: NextFunction) => { 
    const user = req.user;

    if (user) {
        const existingVandor = await FindVandor(user._id)

        return res.json(existingVandor)
    }

    return res.json({"message":"Vandor information Not Found"})
}

export const UpdateVandorProfile = async (req: Request, res: Response, next: NextFunction) => { 
    const{address,foodTypes,phone,name} =<EditVandorInputs> req.body
    const user = req.user;

    if (user) {
        const existingVandor = await FindVandor(user._id)

        if (existingVandor !== null) {
            existingVandor.name = name;
            existingVandor.address = address;
            existingVandor.foodType = foodTypes;
            existingVandor.phone = phone;
            const savedResult = await existingVandor.save();

            return res.json(savedResult)
        }

        return res.json(existingVandor)
    }

    return res.json({"message":"Vandor information Not Found"})
}

export const UpdateVandorCoverImage = async (req: Request, res: Response, next: NextFunction) => { 
     const user = req.user;

    if (user) {
        const vandor = await FindVandor(user._id);

        if (vandor !== null) {
            const files = req.files as [Express.Multer.File]
            const images = files.map((file: Express.Multer.File) => file.filename)
            console.log("images: ", images)
            vandor.coverImages.push(...images)
  
            const result = await vandor.save();

            return res.json(result)
        }
    }

    return res.json({"message":"Somthing went wrong with adding food!"})
}

export const UpdateVandorService = async (req: Request, res: Response, next: NextFunction) => { 
      const user = req.user;

    if (user) {
        const existingVandor = await FindVandor(user._id)

        if (existingVandor !== null) {
            existingVandor.serviceAvailable = !existingVandor.serviceAvailable;
            const savedResult = await existingVandor.save();

            return res.json(savedResult)
        }

        return res.json(existingVandor)
    }

    return res.json({"message":"Vandor information Not Found"})
}

export const AddFood = async (req: Request, res: Response, next: NextFunction) => { 
      const user = req.user;

    if (user) {
        const {name,description,category,foodType,price,readyTime} =<CreateFoodInputs> req.body

        const vandor = await FindVandor(user._id);

        if (vandor !== null) {
            const files = req.files as [Express.Multer.File];

            const images = files.map((file: Express.Multer.File) => file.filename)

            const createFood = await Food.create({
                vandorId: vandor.id,
                name,
                description,
                category,
                foodType,
                images,
                readyTime,
                price,
                
            })

            vandor.foods.push(createFood);
            const result = await vandor.save();

            return res.json(result)
        }
    }

    return res.json({"message":"Somthing went wrong with add food!"})
}

export const GetFoods = async (req: Request, res: Response, next: NextFunction) => { 
      const user = req.user;

    if (user) {
      const foods = await Food.find({vandorId:user._id})

        if (foods !== null) {
            return res.json(foods)
        }
        return res.json({"message":"Foods information Not Found"})
    }

    return res.json({"message":"Vandor information Not Found"});
}