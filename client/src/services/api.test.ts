import { describe, it, expect, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

describe("api axios instance", () => {
    it("should create axios instance with correct baseURL", async () => {

        const mockCreate = vi.fn();
        (axios.create as any) = mockCreate;

        await import("../../src/services/api");

        expect(mockCreate).toHaveBeenCalledWith({
            baseURL: "http://localhost:5000/api",
        });
    });
});