import Plan from "../../src/models/plan";

describe("Plan Model", () => {
    beforeEach(async () => {
      await Plan.destroy({ where: {} });
    });
})