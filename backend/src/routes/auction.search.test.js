import request from "supertest";
import { jest } from "@jest/globals";

const mockLimit = jest.fn();
const mockSort = jest.fn(() => ({
  limit: mockLimit,
}));
const mockFind = jest.fn(() => ({
  sort: mockSort,
}));

jest.unstable_mockModule("../models/auction.model.js", () => ({
  default: {
    find: mockFind,
  },
}));

const { default: app } = await import("../app.js");

describe("GET /api/auctions/search", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("valid search returns results", async () => {
    const fakeResults = [
      { title: "PS5 Console", description: "Disc edition" },
      { title: "PS5 Controller", description: "DualSense" },
    ];

    mockLimit.mockResolvedValue(fakeResults);

    const response = await request(app).get("/api/auctions/search?q=ps5");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ results: fakeResults });

    expect(mockFind).toHaveBeenCalledWith({
      $or: [{ title: /ps5/i }, { description: /ps5/i }],
    });
    expect(mockSort).toHaveBeenCalledWith({ createdAt: -1 });
    expect(mockLimit).toHaveBeenCalledWith(20);
  });

  test("valid search with no matches returns empty array", async () => {
    mockLimit.mockResolvedValue([]);

    const response = await request(app).get(
      "/api/auctions/search?q=nonexistent",
    );

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ results: [] });
  });

  test("missing query returns 400", async () => {
    const response = await request(app).get("/api/auctions/search");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Search query is required",
    });
  });

  test("blank query returns 400", async () => {
    const response = await request(app).get("/api/auctions/search?q=   ");

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      error: "Search query is required",
    });
  });

  test("regex-like input such as .*$ does not match everything", async () => {
    mockLimit.mockResolvedValue([]);

    const response = await request(app).get("/api/auctions/search?q=.*$");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ results: [] });

    expect(mockFind).toHaveBeenCalledWith({
      $or: [{ title: /\.\*\$/i }, { description: /\.\*\$/i }],
    });
  });

  test("surrounding whitespace is trimmed", async () => {
    mockLimit.mockResolvedValue([
      { title: "MacBook Air", description: "Laptop" },
    ]);

    const response = await request(app).get(
      "/api/auctions/search?q=   macbook   ",
    );

    expect(response.status).toBe(200);

    expect(mockFind).toHaveBeenCalledWith({
      $or: [{ title: /macbook/i }, { description: /macbook/i }],
    });
  });

  test("database failure returns 500", async () => {
    mockLimit.mockRejectedValueOnce(new Error("DB failed"));

    const response = await request(app).get("/api/auctions/search?q=ps5");

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: "Failed to search auction items",
    });
  });
});
