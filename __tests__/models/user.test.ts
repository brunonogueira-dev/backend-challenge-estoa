import Plan from "../../src/models/plan";
import Signature from "../../src/models/signature";
import User from "../../src/models/user";

describe("User Model", () => {
  beforeEach(async () => {
    await Plan.sync({alter: true});
    await User.sync({alter: true});
    await Signature.sync({alter: true});
    await User.destroy({ where: {} });
  });

  test("should hash password before creating a user", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      type: "regular",
    };

    const user = await User.create(userData);

    expect(user.password).not.toBe(userData.password);
  });

  test("should authenticate user with correct password", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      type: "regular",
    };

    await User.create(userData);

    const email = "john@example.com";
    const password = "password123";

    const user = await User.authenticate(email, password);

    expect(user).toBeDefined();
    expect(user?.email).toBe(email);
  });

  test("should not authenticate user with incorrect password", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      type: "regular",
    };

    await User.create(userData);

    const email = "john@example.com";
    const password = "wrongpassword";

    const user = await User.authenticate(email, password);

    expect(user).toBeNull();
  });

  test("should hash password before updating the user's password", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      type: "regular",
    };

    const user = await User.create(userData);

    const newPassword = "newPassword123";
    user.password = newPassword;
    await user.save();
    await user.reload();

    expect(user.password).not.toBe(newPassword);
  });

  test("should not rehash password when updating other user fields", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      type: "regular",
    };

    const user = await User.create(userData);

    const oldPassword = user.password;
    user.name = "Updated Name";
    await user.save();
    await user.reload();

    // The password should remain unchanged
    expect(user.password).toBe(oldPassword);
  });

  test("should handle incorrect email for authentication", async () => {
    const userData = {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      type: "regular",
    };

    await User.create(userData);

    const email = "nonexistent@example.com";
    const password = "password123";

    const user = await User.authenticate(email, password);

    expect(user).toBeNull();
  });

  test("should handle non-existing user for authentication", async () => {
    const email = "nonexistent@example.com";
    const password = "password123";

    const user = await User.authenticate(email, password);

    expect(user).toBeNull();
  });
});
