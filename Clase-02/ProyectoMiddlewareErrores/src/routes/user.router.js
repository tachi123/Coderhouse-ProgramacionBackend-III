import { Router } from 'express';
import CustomError from '../services/errors/CustomError.js';
import EErrors from '../services/errors/enum.js';
import { generateUserErrorInfo } from '../services/errors/info.js';

const router = Router();

const users = [];

router.get('/', (req,res ) => {

    var {last_name} = req.body;

    res.send({status: "success", payload: users});
})

router.post('/', (req, res) => {
    const { first_name, last_name, age, email} = req.body;

    if(!first_name || !last_name || !email){
        CustomError.createError(
            {
                name: "User creation error",
                cause: generateUserErrorInfo({first_name, last_name, age, email}),
                message: "Error Trying to create User",
                code: EErrors.INVALID_TYPES_ERROR
            })
    }    

    const user = {
        first_name,
        last_name,
        age,
        email
    };

    if(users.length === 0){
        user.id = 1;
    }else{
        user.id = users[users.length -1].id + 1;
    }

    users.push(user);
    res.send({status: "success", payload: user});
})

export default router;