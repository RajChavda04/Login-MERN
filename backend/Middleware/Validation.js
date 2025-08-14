const Joi = require("joi")

const registerValidation =(req,res,next)=> {
   const schema = Joi.object({
      name:Joi.string().min(4).max(100).required(),
      email:Joi.string().email().min(6).max(100).required(),
    //   phone:Joi.number().min(10).max(10).required(),
    phone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
      address:Joi.string().min(10).max(100).required(),
      password:Joi.string().min(4).max(100).required(),

   });
   const{error}= schema.validate(req.body);
   if(error){
    return res.status(400)
    .json({message: "Bad request", error})
   }

   next();
}

const loginValidation =(req,res,next)=>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().min(4).max(10).required()
    });
    const {error}=schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Bed request", error})
    }
    next();
}
module.exports ={
    registerValidation,
    loginValidation
}