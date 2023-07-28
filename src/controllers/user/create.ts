import { getFreePlan } from "../../db/planDbHandler";
import { createUser } from "../../db/userDbHandlers";
import { IUserAttributes, IUserModel } from "../../types/models/user";
import SignatureCreator from "../signatures/create";

async function reverseCreation(user: IUserModel, error: string) {
    await user.destroy();
    throw new Error(error);
}

async function addFreePlan(user: IUserModel) {
    const freePlan = await getFreePlan();

    if (!freePlan) return await reverseCreation(user, "failed while trying to create free plan for the user");

    const sigCreator = new SignatureCreator(user.id, freePlan.id);
    const sig = await sigCreator.create();

    if (!sig) return await reverseCreation(user, "failed while trying to create free plan for the user");
}

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

    async create(): Promise<IUserModel | null> {
        try {
            const atributes: IUserAttributes = {
                name: this.name,
                email: this.email,
                password: this.password,
                type: this.type
            };
            const user = await createUser(atributes);
            
            if (!user) return null;

            try {
                await addFreePlan(user);
            } catch (_) {
                return null;
            } 
            
            return user;
        } catch (e) {
            console.log("Failed while trying to create the user");
            return null;
        }
    }
}