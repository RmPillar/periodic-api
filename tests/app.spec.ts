import chai, { expect } from "chai";
import request from "supertest";
import app from "../";
import connection from "../db/connection";
import chaiSorted from "chai-sorted";

chai.use(chaiSorted);

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

describe("/api", () => {
  describe("/elements", () => {
    describe("GET", () => {
      it("Status 200: returns all elements in database", async () => {
        const { body } = await request(app).get("/api/elements").expect(200);

        expect(body).to.be.an("array");
        expect(body[0]).to.include.keys(
          "element_id",
          "name",
          "symbol",
          "proton_number",
          "mass"
        );
      });
      it("Status 200: returns all elements in database ordered by id in ascending order by default", async () => {
        const { body } = await request(app).get("/api/elements").expect(200);

        // @ts-ignore
        expect(body).to.be.sortedBy("element_id", { ascending: true });
      });
      it("Status 200: returns all elements in database ordered by sort_by query, in ascending order by default", async () => {
        const { body } = await request(app)
          .get("/api/elements?sort_by=name")
          .expect(200);

        // @ts-ignore
        expect(body).to.be.ascendingBy("name");
      });
      it("Status 200: returns all elements in database ordered sort_by query, in order query", async () => {
        const { body } = await request(app)
          .get("/api/elements?sort_by=name&order=desc")
          .expect(200);

        // @ts-ignore
        expect(body).to.be.descendingBy("name");
      });
      it("Status 200: returns first 10 elements in database by default", async () => {
        const { body } = await request(app).get("/api/elements").expect(200);

        expect(body).to.have.length(10);
      });
      it("Status 200: returns number of elements specified in limit query", async () => {
        const { body } = await request(app)
          .get("/api/elements?limit=5")
          .expect(200);

        expect(body).to.have.length(5);
      });
      it("Status: 400 responds with bad request when sort_by query has a non-existant column", async () => {
        const { body } = await request(app)
          .get("/api/elements?sort_by=names")
          .expect(400);

        expect(body.msg).to.be.equal("Bad Request!!");
      });
    });
  });
});
