import Joi from "joi";

export const RegisterValidate = Joi.object({
  name: Joi.string().required(),
  address: Joi.string().required(),
  email: Joi.string().email().lowercase().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  userType: Joi.required(),
  contactNumber: Joi.number().required(),
});

export const CategoryValidate = Joi.object({
  name: Joi.string().required().lowercase(),
  description: Joi.string().required().min(10).max(30),
});
