import jwt from "jsonwebtoken"



export const createCookie =  (_id,req,res) => {
    const token =   jwt.sign({_id : _id},process.env.JWT_PRIVATE_KEY)
    res.cookie("token",token, {
        maxAge : 1000 * 60 * 15,
        httpOnly : true,
    })
}