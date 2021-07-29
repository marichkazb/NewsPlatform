import {NextFunction, Response} from "express";
import jwt from "jsonwebtoken";
import Request from "../types/Request";

export default function(req: Request, res: Response, next: NextFunction) {
    if (req.method === "OPTIONS") {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: "Пользователь не авторизован"})
        }
        req.userId = jwt.verify(token, 'secret')?.id
        console.log({jwt: jwt.verify(token, 'secret')})
        next()
    } catch (e) {
        console.log(e)
        return res.status(403).json({message: "Пользователь не авторизован"})
    }
}



















//     // Get token from header
//     const token = req.header("x-auth-token");
//     console.log('Req:', req.body, req.header)
//
//     // Check if no token
//     if (!token) {
//         return res
//             .status(HttpStatusCodes.UNAUTHORIZED)
//             .json({ msg: "No token, authorization denied" });
//     }
//     // Verify token
//     try {
//         const payload: Payload | any = jwt.verify(token, config.get("jwtSecret"));
//         req.userId = payload.userId;
//         next();
//     } catch (err) {
//         res
//             .status(HttpStatusCodes.UNAUTHORIZED)
//             .json({ msg: "Token is not valid" });
//     }
// }