import User from "../../models/user";
import { UserAttributes, UserModel } from "../../types/models/user";

type TCreator = UserModel | null; 

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

    async create(): Promise<TCreator> {
        try {
            const userAttributes: UserAttributes = {
                name: this.name,
                email: this.email,
                password: this.password,
                type: this.type
            };
            const user = await User.create(userAttributes);
            return user;
        } catch (e) {
          console.log("Failed while trying to create the user");
          return null;
        }
    }
}