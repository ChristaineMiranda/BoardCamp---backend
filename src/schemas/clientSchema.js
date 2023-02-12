import joi from 'joi';

const clientSchema = joi.object({


//RESTRINGIR PHONE E CPF À NUMEROS


        name: joi.string().required(),
        phone: joi.string().min(10).max(11).required(),
        cpf: joi.string().min(11).max(11).required(),
        birthday: joi.date().required()
})
export default clientSchema;