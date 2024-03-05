const receiveEmail = require("../functions/receiveEmail");
const pool = require("../database/db");
const { describe, beforeEach } = require("node:test");

describe("Receiving Email", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("should receive and notify user of email if the email exists and was sent", async () => {
        expect(receiveEmail(1234, 1234)).toBe(true);
    })
})