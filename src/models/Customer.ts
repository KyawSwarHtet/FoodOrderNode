import mongoose,{Schema,Document,Model} from "mongoose";

interface CustomerDoc extends Document{
    email: string;
    password: string;
    salt: string;
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    verified: boolean
    otp: number;
    otp_expiry: Date
    lat:number
    lng: number;
}

const CustomerSchema = new Schema({
    email: {type:String, require:true},
    password: { type: String, require: true },
    salt: { type: String, require: true, default: "" },
    firstName: { type: String, require: true },
    lastName: { type: String, default: "" },
    phone: {type:String, require:true},
    address: {type:String,default:""},
    verified: {type:Boolean, default:false, require: true },  
    otp: {type:Number, require: true },
    otp_expiry: {type:Date, require: true },
    lat: {type:Number,default:0},
    lng: {type:Number,default:0},
    
}, {
    toJSON: {
        transform: (doc, ret)=>{
            delete ret.password;
            delete ret.salt;
            delete ret._v;
            delete ret.createAt;
            delete ret.updatedAt
        }
},
    timestamps:true
})

const Customer = mongoose.model<CustomerDoc>("customer", CustomerSchema)

export {Customer}