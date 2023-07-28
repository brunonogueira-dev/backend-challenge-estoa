import { Request, Response, NextFunction } from "express";
import UserService from "../services/user.service";
import { IUser, IUserInput } from "../interfaces";

export default class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public listAllUsers = async (
        _: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const users: IUser[] = await this.userService.listAllUsers();
            res.json(users);
        } catch (error) {
            next(error);
        }
    };

    public findUserById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        try {
            const user: IUser | null = await this.userService.findUserById(id);
            if (!user) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json(user);
            }
        } catch (error) {
            next(error);
        }
    };

    public findUserByName = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { name } = req.params;
        try {
            const users: IUser[] = await this.userService.findUserByName(name);
            res.json(users);
        } catch (error) {
            next(error);
        }
    };

    public findUserByDate = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { date } = req.params;
        try {
            const users: IUser[] = await this.userService.findUserByDate(date);
            res.json(users);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const input: IUserInput = req.body;
        try {
            const id: string = await this.userService.createUser(input);
            res.json({ id });
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        try {
            const result = await this.userService.deleteUser(id);
            if (!result) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json({ message: result });
            }
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        const { id } = req.params;
        const input: IUserInput = req.body;
        try {
            const message: string | null = await this.userService.updateUser(
                id,
                input
            );
            if (!message) {
                res.status(404).json({ message: "User not found" });
            } else {
                res.json({ message });
            }
        } catch (error) {
            next(error);
        }
    };
}
