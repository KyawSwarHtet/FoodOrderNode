import { Request,Response,NextFunction } from "express";
import { CreateVandorInput } from "../dto/Vandor.dto";
import { Vandor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";


export const FindVandor = async (id: string | undefined, email?: string) => {
    if (email) {
        return await Vandor.findOne({ email})
    } 

    return await Vandor.findById(id)
}


export const CreateVandor = async (req: Request, res: Response, next: NextFunction) => {
    const {name,address,email,foodType,ownerName,password,phone,pincode} = <CreateVandorInput>req.body

    const existingVandor = await FindVandor('', email);

    if (existingVandor !== null) {
        return res.json({"message":"A vandor is already exist with this email address"})
    }

    //generate a salt 
    const salt = await GenerateSalt();
    const userPassword= await GeneratePassword(password,salt)
    //encrypt the password using the salt

    const CreateVandor =await Vandor.create({
        name,
        address,
        pincode,
        foodType,
        email,
        password: userPassword,
        salt: salt,
        ownerName,
        phone,
        rating: 0,
        serviceAvailable: false,
        converImages:[]
    })

    return res.json(CreateVandor)
}

export const GetVandors = async (req: Request, res: Response, next: NextFunction) => {
    const vandor = await Vandor.find()

    if (vandor !== null) {
        return res.json(vandor);
    }

    return res.json({"message": "vandors data not available"})
}

export const GetVandorByID = async (req: Request, res: Response, next: NextFunction) => {
    const vandorId = req.params.id;
    const vandor = await FindVandor(vandorId)

    if (vandor !== null) {
        return res.json(vandor)
        
    }

    return res.json({ "message": "vandor detail data not available" })

}

