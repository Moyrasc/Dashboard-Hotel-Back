import request from "supertest"
import app from "../app";

describe("Login test", (): void => {
  test("Login OK", async (): Promise<void> => {
    const response = await request(app).post("/login").send({
      email: "admin@admin.com",
      password: "1234",
    });
    expect(response.statusCode).toBe(200);
  });

  test("Login KO", async (): Promise<void> => {
    const response = await request(app).post("/login").send({
      email: "prueba@email.com",
      password: "34sh",
    });

    expect(response.statusCode).toBe(401);
  });
});
