const request = require("supertest");
const app = require("../app");

test("GET /health returns 200", async () => {
  const res = await request(app).get("/health");
  expect(res.statusCode).toBe(200);
  expect(res.body.status).toBe("ok");
});

test("GET /students without token returns 401", async () => {
  const res = await request(app).get("/students");
  expect(res.statusCode).toBe(401);
});
