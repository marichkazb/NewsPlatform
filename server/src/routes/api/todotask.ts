import {Response, Router} from "express";
import {check, validationResult} from "express-validator/check";
import HttpStatusCodes from "http-status-codes";
import Request from "../../types/Request";
import TodoTask from "../../models/ToDoTask";
import authMiddle from '../../middlewares/middleware'

const router: Router = Router();

const getTodoTasks = async (req: Request, res: Response) => {
    console.log(req.userId)
    try {

        const todos = await TodoTask.find({userId: req.userId, isDeleted: false});
        return res.json(todos);
    } catch (err) {
        console.log(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

const createTodoTask = async (req: Request, res: Response) => {
    console.log(req.body);
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res
    //         .status(HttpStatusCodes.BAD_REQUEST)
    //         .json({errors: errors.array()});
    // }

    const {title, description, year, isPublic = false, isCompleted = false} = req.body
    const todoFields = {
        title,
        description,
        year,
        isPublic,
        isCompleted,
        userId: req.userId
    };
    try {
        const todo = new TodoTask(todoFields)
        await todo.save();
        res.json(todo)
    } catch (err) {
        console.log(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}

const updateTodo = async (req: Request, res: Response) => {
    try {
        // Update task
        const {title, description, year, isPublic, isCompleted} = req.body
        const todoFields = {
            title,
            description,
            year,
            isPublic,
            isCompleted,
            userId: req.userId
        };
        const updatedTask = await TodoTask.findOneAndUpdate({_id: req.params.id, userId: req.userId, isDeleted: {$ne: true}}, todoFields);
        res.json({msg: "ToDoTask updated", updatedTask});
    } catch (err) {
        console.error(err.message);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).send("Server Error");
    }
}


const sendOneTodo = async(req: Request, res: Response) => {
    try {
        const todo = await TodoTask.findOne({_id: req.params.id })
        res.json({ data: todo })
        } catch(err){
            console.error(err.message);
        }
}



const deleteTodoTask = async (req: Request, res: Response) => {
    try {
        await TodoTask.findOneAndUpdate({_id: req.params.id, isDeleted: { $ne: true }, userId: req.userId,}, {isDeleted: true}).lean();
        res.json({msg: "ToDoTask removed", id: req.params.id});
    } catch (err) {
        console.error(err.message);
    }
}

router.get('/:id', authMiddle, sendOneTodo );
router.delete("/:id", authMiddle,  deleteTodoTask);
router.get('/', authMiddle, getTodoTasks);
router.post('/',
    [
        check("title", "Title is required").not().isEmpty(),
        check("description", "Desc is required").not().isEmpty(),
        check("year", "Year is required").not().isEmpty(),
        check("isPublic", "Public is required").not().isEmpty(),
        check("isCompleted", "Completed is required").not().isEmpty(),
    ], authMiddle, createTodoTask);
router.put('/:id', authMiddle,
updateTodo);

export default router;
