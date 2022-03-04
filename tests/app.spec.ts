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
          "mass",
          "group",
          "period",
          "block",
          "state_room_temp",
          "melting_point",
          "boiling_point",
          "density",
          "appearance",
          "discovery_date",
          "discovered_by",
          "name_origin",
          "uses",
          "electron_configuration"
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
      it("Status 200: returns all elements in queried group", async () => {
        const { body } = await request(app)
          .get("/api/elements?group=1")
          .expect(200);

        const groups = body.every((item) => item.group === 1);

        expect(groups).to.be.true;
      });
      it("Status 200: returns all elements with with group above queried group", async () => {
        const { body } = await request(app)
          .get("/api/elements?group=gt-10")
          .expect(200);

        const dates = body.every((item) => item.group > 10);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with group between queried groups", async () => {
        const { body } = await request(app)
          .get("/api/elements?group=gt-13_lt-16")
          .expect(200);

        const dates = body.every((item) => item.group > 13 && item.group < 16);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements in queried period", async () => {
        const { body } = await request(app)
          .get("/api/elements?period=1")
          .expect(200);

        const periods = body.every((item) => item.period === 1);

        expect(periods).to.be.true;
      });
      it("Status 200: returns all elements with with period above queried period", async () => {
        const { body } = await request(app)
          .get("/api/elements?period=gt-1")
          .expect(200);

        const dates = body.every((item) => item.period > 1);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with period between queried periods", async () => {
        const { body } = await request(app)
          .get("/api/elements?period=gt-1_lt-3")
          .expect(200);

        const dates = body.every((item) => item.period > 1 && item.period < 3);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements in queried block", async () => {
        const { body } = await request(app)
          .get("/api/elements?block=1")
          .expect(200);

        const blocks = body.every((item) => item.block === 1);

        expect(blocks).to.be.true;
      });
      it("Status 200: returns all elements with queried state", async () => {
        const { body } = await request(app)
          .get("/api/elements?state_room_temp=gas")
          .expect(200);

        const states = body.every((item) => item.state_room_temp === "gas");

        expect(states).to.be.true;
      });
      it("Status 200: returns all elements with queried discovery date", async () => {
        const { body } = await request(app)
          .get("/api/elements?discovery_date=1895")
          .expect(200);

        const dates = body.every((item) => item.discovery_date === 1895);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with discovery date above queried discovery date", async () => {
        const { body } = await request(app)
          .get("/api/elements?discovery_date=gt-1895")
          .expect(200);

        const dates = body.every((item) => item.discovery_date > 1895);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with discovery date between queried discovery dates", async () => {
        const { body } = await request(app)
          .get("/api/elements?discovery_date=gt-1895_lt-1950")
          .expect(200);

        const dates = body.every(
          (item) => item.discovery_date > 1895 && item.discovery_date < 1950
        );

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with queried melting point", async () => {
        const { body } = await request(app)
          .get("/api/elements?melting_point=13.99")
          .expect(200);

        const meltingPoint = body.every((item) => item.melting_point == 13.99);

        expect(meltingPoint).to.be.true;
      });
      it("Status 200: returns all elements with with melting point above queried melting point", async () => {
        const { body } = await request(app)
          .get("/api/elements?melting_point=gt-13.99")
          .expect(200);

        const dates = body.every((item) => item.melting_point > 13.99);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with melting point between queried melting points", async () => {
        const { body } = await request(app)
          .get("/api/elements?melting_point=gt-13.99_lt-150")
          .expect(200);

        const dates = body.every(
          (item) => item.melting_point > 13.99 && item.melting_point < 150
        );

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with queried boiling point", async () => {
        const { body } = await request(app)
          .get("/api/elements?boiling_point=20.271")
          .expect(200);

        const boilingPoint = body.every((item) => item.boiling_point == 20.271);

        expect(boilingPoint).to.be.true;
      });
      it("Status 200: returns all elements with with boiling point above queried boiling point", async () => {
        const { body } = await request(app)
          .get("/api/elements?boiling_point=gt-13.99")
          .expect(200);

        const dates = body.every((item) => item.boiling_point > 13.99);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with boiling point between queried boiling points", async () => {
        const { body } = await request(app)
          .get("/api/elements?boiling_point=gt-13.99_lt-150")
          .expect(200);

        const dates = body.every(
          (item) => item.boiling_point > 13.99 && item.boiling_point < 150
        );

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with queried density", async () => {
        const { body } = await request(app)
          .get("/api/elements?density=0.000082")
          .expect(200);

        const density = body.every((item) => item.density == 0.000082);

        expect(density).to.be.true;
      });
      it("Status 200: returns all elements with with density above queried density", async () => {
        const { body } = await request(app)
          .get("/api/elements?density=gt-0.00008200")
          .expect(200);

        const dates = body.every((item) => item.density > 0.000082);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with density between queried densities", async () => {
        const { body } = await request(app)
          .get("/api/elements?density=gt-0.00008200_lt-3.51300000")
          .expect(200);

        const dates = body.every(
          (item) => item.density > 0.000082 && item.density < 3.513
        );

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with queried mass", async () => {
        const { body } = await request(app)
          .get("/api/elements?mass=1.008")
          .expect(200);

        const mass = body.every((item) => item.mass == 1.008);

        expect(mass).to.be.true;
      });
      it("Status 200: returns all elements with with mass above queried mass", async () => {
        const { body } = await request(app)
          .get("/api/elements?mass=gt-10")
          .expect(200);

        const dates = body.every((item) => item.mass > 10);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with mass between queried densities", async () => {
        const { body } = await request(app)
          .get("/api/elements?mass=gt-10_lt-20")
          .expect(200);

        const dates = body.every(
          (item) => item.mass > 0.000082 && item.mass < 20
        );

        expect(dates).to.be.true;
      });
      it("Status: 400 responds with bad request when sort_by query has a non-existant column", async () => {
        const { body } = await request(app)
          .get("/api/elements?sort_by=names")
          .expect(400);

        expect(body.msg).to.be.equal("Bad Request!!");
      });
    });
    describe("/:element_id", () => {
      describe("GET", () => {
        it("Status 200: returns requested element", async () => {
          const { body } = await request(app)
            .get("/api/elements/1")
            .expect(200);

          expect(body).to.be.an("array");
          expect(body[0]).to.include.keys(
            "element_id",
            "name",
            "symbol",
            "proton_number",
            "mass",
            "group",
            "period",
            "block",
            "state_room_temp",
            "melting_point",
            "boiling_point",
            "density",
            "appearance",
            "discovery_date",
            "discovered_by",
            "name_origin",
            "uses",
            "electron_configuration"
          );
          expect(body[0].element_id).to.be.equal(1);
        });
        it("Status 404: responds with not found when requested element does not exist", async () => {
          const { body } = await request(app)
            .get("/api/elements/999999")
            .expect(404);

          expect(body.msg).to.be.equal("Element Not Found");
        });
        it("Status: 400 responds with bad request when element id is not a number", async () => {
          const { body } = await request(app)
            .get("/api/elements/t")
            .expect(400);

          expect(body.msg).to.be.equal("Bad Request!!");
        });
      });
    });
  });
});
