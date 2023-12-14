// Email

// notifications

//OTP
export const GenerateOtp = () => {
    //generating six digits OTP number
    const otp = Math.floor(100000 + Math.random()*900000)
    let expiry = new Date()
    // adding 30 minutes extra to expiry date
    expiry.setTime(new Date().getTime() + (30 * 60 *1000))
    
    return {otp,expiry}
}

export const onRequestOTP = async (otp: number, toPhoneNumber: string) => {
    const accountSid = process.env.ACCOUNTSID;
    const authToken = process.env.AUTHTOKEN;
    const fromPhoneNumber = process.env.PHONENUMBER;

    console.log("accountSid: " + accountSid)
    console.log("accountToken: " + authToken)
    console.log("fromPhoneNumber: " + fromPhoneNumber)
    console.log("toPhoneNumber: " + toPhoneNumber)
    const client = require("twilio")(accountSid, authToken);

    const response = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: fromPhoneNumber,
        to: `+95${toPhoneNumber}`,
    })

    return response;
}