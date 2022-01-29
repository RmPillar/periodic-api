import chai, { expect } from "chai";
import chaiSorted from "chai-sorted";
import request from "supertest";
import app from "../";
import connection from "../db/connection";

chai.use(chaiSorted);

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("/api", () => {
  describe("/elements", () => {
    describe("GET", () => {
      it("Status 200: returns all elements in database", async () => {
        const { body } = await request(app).get("/api/elements").expect(200);

        expect(body[0]).to.have.keys(
          "element_id",
          "name",
          "symbol",
          "proton_number",
          "mass"
        );
      });
    });
  });
});
