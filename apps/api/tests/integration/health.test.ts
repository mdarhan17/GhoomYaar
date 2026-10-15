import { describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "../../src/app.js";

describe("GhoomYaar Health API", () => {
  it("returns an HTTP 200 response", async () => {
    const response = await request(app)
      .get("/api/v1/health");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.status).toBe("running");
  });

  it("returns 404 for unknown routes", async () => {
    const response = await request(app)
      .get("/api/v1/unknown-route");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
  });
});