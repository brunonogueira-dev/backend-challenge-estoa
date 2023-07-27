import Plan from "../../models/plan";
import User from "../../models/user";
import { IUserAttributes, IUserModel } from "../../types/models/user";
import SignatureCreator from "../signatures/create";


export default class UserCreator {
    private email: string;
    private name: string;
    private password: string;
    private type: string;
  
    constructor(email: string, name: string, password: string, type: string) {
        this.email = email;
        this.name = name;
        this.password = password;
        this.type = type;
    }

    async reverseCreation(user: IUserModel): Promise<null> {
        await user.destroy();
        return null;
    }

    async create(): Promise<IUserModel | null> {
        try {
            const IUserAttributes: IUserAttributes = {
                name: this.name,
                email: this.email,
                password: this.password,
                type: this.type
            };
            const user = await User.create(IUserAttributes);

            if (!user) return null;

            const freePlan = await Plan.findOne({ where: { name: "free" } });

            if (!freePlan) return await this.reverseCreation(user);

            const sigCreator = new SignatureCreator(user, freePlan);
            const sig = await sigCreator.create();

            if (!sig) return await this.reverseCreation(user);
            
            await user.reload();
            return user;
        } catch (e) {
            console.log("Failed while trying to create the user");
            return null;
        }
    }
}