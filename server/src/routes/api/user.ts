import bcrypt from "bcryptjs";
import config from "config";
import {Response, Router} from "express";
import {check, validationResult} from "express-validator/check";
import jwt from "jsonwebtoken";

import Request from "../../types/Request";
import User, {IUser} from "../../models/User";
import authMiddle from "../../middlewares/middleware";
import HttpStatusCodes from "http-status-codes";


const router: Router = Router();

const generateAccessToken = (id) => {
    const payload = {
        id,
    }
    return jwt.sign(payload, 'secret', {expiresIn: "24h"} )
}


const loginUser = async (req: Request, res: Response ) => {
        try {
            const {email, password} = req.body
            const user = await User.findOne({email})
            if (!user) {
                return res.status(400).json({message: `Пользователь ${email} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user._id)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }



const registerUser = async(req: Request, res: Response, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации", errors})
            }
            const {email, password} = req.body;
            const candidate = await User.findOne({email})
            if (candidate) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({email, password: hashPassword})
            await user.save()
            const token = generateAccessToken(user._id)
            delete user.password
            console.log(user)
            return res.json( {message: "Пользователь успешно зарегистрирован", token, user})
            (next)
    } catch (e) {
        console.log(e)
        res.status(400).json({message: 'Registration error'})
    }
}



const deleteUser = async(req: Request, res: Response) => {
    try{
        await User.findOneAndUpdate({ isDeleted: { $ne: true}, _id: req.userId}, {isDeleted: true})
        res.json({msg: 'User removed', id: req.params.id})
    } catch(e){
        console.log(e)
        res.status(400).json({message: 'Delete error'})
    }
}


const getUsers = async  (req: Request, res: Response)=> {
    let users :any = await User.find({userId: req.userId});
    console.log(`Users in the database: ${users}`);
    res.send(users);
}



const getUserData = async(req: Request, res: Response) => {
    console.log('USER DATA: ', req.userId)
    try{
        const user :any = await User.findOne({_id: req.userId}).lean();
        return res.json(user)
    }catch (err) {
        console.log(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
    }



router.get('/get-data', authMiddle,  getUserData)
// router.get('/', authMiddle, getUsers);
router.post('/register',[
        check("email", "Please include a valid email").isEmail(),
        check(
            "password",
            "Please enter a password with 6 or more characters"
        ).isLength({ min: 6 }) ],
    registerUser)
router.post('/login', [
    check("email", "Please include a valid email").isEmail(),
    check(
        "password",
        "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }) ],
    loginUser)
router.delete('/', deleteUser)



export default router;