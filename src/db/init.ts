import User from "./models/User";
import Plan from "./models/Plan";
import Subscription from "./models/Subscription";

const isDev = process.env.NODE_ENV === "dev";

const dbInit = () => {
    User.sync({ alter: isDev });
    Plan.sync({ alter: isDev });
    Subscription.sync({ alter: isDev });
};

export default dbInit;
