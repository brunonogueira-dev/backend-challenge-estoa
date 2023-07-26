import db from "../../src/configs/db";
import Plan from "../../src/models/plan";
import Signature from "../../src/models/signature";
import User from "../../src/models/user";

describe("User and Plan relationship", () => {
    beforeEach(async () => {
        await Plan.sync({alter: true});
        await User.sync({alter: true});
        await Signature.sync({alter: true});
        await User.destroy({ where: {} });
        await Plan.destroy({ where: {} });
    });
  
    test("should associate User with Plan through Signature", async () => {
      const user = await User.create({
        name: "John Doe",
        email: "john@example.com",
        password: "password",
        type: "regular",
      });
  
      const plan = await Plan.create({
        name: "Plano Silver",
        price: 50,
        expiration: 6,
      });
  
      console.log('aki')
      await user.addPlan(plan);
  
      const userPlans = await user.getPlans();
      const planUsers = await plan.getUsers();
  
      expect(userPlans).toContainEqual(expect.objectContaining({ id: plan.id }));
      expect(planUsers).toContainEqual(expect.objectContaining({ id: user.id }));
    });
});