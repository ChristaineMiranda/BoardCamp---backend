export default function validateData(schema, data){
    const validation = schema.validate(data, {abortEarly: false});
    if(validation.error){
        const errors = validation.error.details.map(detail => detail.message);
        return(errors);
    }
}