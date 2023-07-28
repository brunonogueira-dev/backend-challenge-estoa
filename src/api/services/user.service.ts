import User from "../../db/models/User";
import Plan from "../../db/models/Plan";
import Subscription from "../../db/models/Subscription";
import { IUser, IUserInput, IPlan, ISubscription } from "../interfaces";

export default class UserService {
    public async listAllUsers(): Promise<IUser[]> {
        return User.findAll();
    }

    public async findUserById(id: string): Promise<IUser | null> {
        return User.findByPk(id);
    }

    public async findUserByName(name: string): Promise<IUser[]> {
        const users = await this.listAllUsers();
        return users.filter((user) => user.name === name);
    }

    public async findUserByDate(date: string): Promise<IUser[]> {
        const targetDate = new Date(date);
        const users = await this.listAllUsers();
        return users.filter(
            (user) => user.createdAt.getTime() === targetDate.getTime()
        );
    }

    public async createUser(input: IUserInput): Promise<string> {
        const { id } = await User.create({
            ...input,
            planType: input.planType || "free",
        });

        const plan: IPlan | null = await Plan.findOne({
            where: { name: "free" },
        });

        if (plan) {
            const today = new Date();
            const expirationDate = new Date(
                today.setMonth(today.getMonth() + plan.expiresIn)
            );
            await Subscription.create({
                planId: plan.id,
                userId: id,
                expirationDate,
            });
        }

        return id;
    }

    public async deleteUser(id: string) {
        const response = await User.destroy({ where: { id } });
        return response ? "User deleted succesfully" : null;
    }

    public async updateUser(
        id: string,
        input: IUserInput
    ): Promise<string | null> {
        const updatedUser = await User.update({ ...input }, { where: { id } });
        const userPlan: IPlan | null = await Plan.findOne({
            where: { name: input.planType },
        });

        if (userPlan) {
            await this.updateSubscription(id, userPlan);
        }

        if (updatedUser[0] === 1) {
            return `Updated user with ID ${id}`;
        }

        return null;
    }

    public async updateSubscription(id: string, plan: IPlan) {
        const subscription: ISubscription | null = await Subscription.findOne({
            where: { userId: id },
        });

        if (subscription) {
            await Subscription.update(
                {
                    planId: plan.id,
                    expirationDate: new Date(
                        subscription.expirationDate.setMonth(
                            subscription.expirationDate.getMonth() +
                                plan.expiresIn
                        )
                    ),
                },
                { where: { userId: id } }
            );
        }
    }
}
