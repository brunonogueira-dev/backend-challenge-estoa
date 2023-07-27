import { where } from "sequelize";
import { Plan, User, Subscription } from "../../db/models";
import {
    IUser,
    IUserInput,
    IPlan,
    IPlanInput,
    ISubscription,
} from "../interfaces";

export default class userService {
    public async listAll(): Promise<IUser[]> {
        const users: IUser[] = await User.findAll();
        return users;
    }

    public async findById(id: number): Promise<IUser | null> {
        const user: IUser | null = await User.findByPk(id);
        return user ? user : null;
    }

    public async findByName(name: string): Promise<IUser[]> {
        const users = await this.listAll();
        return users.filter((user) => user.name === name);
    }

    public async findByDate(date: string): Promise<IUser[]> {
        const users = await this.listAll();
        return users.filter((user) => user.createdAt === new Date(date));
    }

    public async createUser(input: IUserInput): Promise<number> {
        const { id } = await User.create({
            ...input,
            type: input.type || "free",
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

    public async deleteUser(id: number) {
        const response = await User.destroy({ where: { id } });
        return response ? "Usuário deletado com sucesso" : null;
    }

    public async updateUser(
        id: number,
        input: IUserInput
    ): Promise<string | null> {
        const updatedUser = await User.update({ ...input }, { where: { id } });
        const userPlan: IPlan | null = await Plan.findOne({
            where: { name: input.type },
        });

        if (userPlan) {
            await this.updateSubscription(id, userPlan);
        }

        if (updatedUser[0] === 1) {
            return "Usuário atualizado com sucesso";
        }

        return null;
    }

    public async updateSubscription(id: number, plan: IPlan) {
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
