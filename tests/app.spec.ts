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
          "neutron_number",
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
          "electron_configuration",
          "isotopes",
          "oxidation_states",
          "classification",
          "atomic_radius",
          "covalent_radius",
          "electron_affinity",
          "electronegativity",
          "ionisation_energies"
        );
        expect(body[0].isotopes).to.be.an("array");
        expect(body[0].oxidation_states).to.be.an("array");
        expect(body[0].ionisation_energies).to.be.an("array");
        expect(body[0].isotopes[0]).include.keys(
          "element_id",
          "isotope_id",
          "name",
          "mass",
          "natural_abundance",
          "half_life"
        );
        expect(body[0].oxidation_states[0]).include.keys(
          "element_id",
          "oxidation_state_id",
          "oxidation_state"
        );
        expect(body[0].ionisation_energies[0]).include.keys(
          "element_id",
          "ionisation_energy_id",
          "ionisation_energy",
          "position"
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
      it("Status 200: returns all elements with with mass between queried mass", async () => {
        const { body } = await request(app)
          .get("/api/elements?mass=gt-10_lt-20")
          .expect(200);

        const dates = body.every(
          (item) => item.mass > 0.000082 && item.mass < 20
        );

        expect(dates).to.be.true;
      });
      it("Status 200: returns all elements with with neutron number above queried neutron number", async () => {
        const { body } = await request(app)
          .get("/api/elements?neutron_number=gt-10")
          .expect(200);

        const neutronNumbers = body.every((item) => item.neutron_number > 10);

        expect(neutronNumbers).to.be.true;
      });
      it("Status 200: returns all elements with with neutron number between queried neutron number", async () => {
        const { body } = await request(app)
          .get("/api/elements?neutron_number=gt-5_lt-10")
          .expect(200);

        const neutronNumbers = body.every(
          (item) => item.neutron_number > 5 && item.neutron_number < 10
        );

        expect(neutronNumbers).to.be.true;
      });
      it("Status 200: returns all elements with with atomic radius above queried atomic radius", async () => {
        const { body } = await request(app)
          .get("/api/elements?atomic_radius=gt-1.5")
          .expect(200);

        const atomicRadius = body.every((item) => item.atomic_radius > 1.5);

        expect(atomicRadius).to.be.true;
      });
      it("Status 200: returns all elements with with atomic radius between queried atomic radius", async () => {
        const { body } = await request(app)
          .get("/api/elements?atomic_radius=gt-1.5_lt-1.6")
          .expect(200);

        const atomicRadius = body.every(
          (item) => item.atomic_radius > 1.5 && item.atomic_radius < 1.6
        );

        expect(atomicRadius).to.be.true;
      });
      it("Status 200: returns all elements with with convalent radius above queried convalent radius", async () => {
        const { body } = await request(app)
          .get("/api/elements?covalent_radius=gt-0.32")
          .expect(200);

        const convalentRadius = body.every(
          (item) => item.covalent_radius > 0.32
        );

        expect(convalentRadius).to.be.true;
      });
      it("Status 200: returns all elements with with convalent radius between queried convalent radius", async () => {
        const { body } = await request(app)
          .get("/api/elements?covalent_radius=gt-0.32_lt-1")
          .expect(200);

        const convalentRadius = body.every(
          (item) => item.covalent_radius > 0.32 && item.covalent_radius < 1
        );

        expect(convalentRadius).to.be.true;
      });
      it("Status 200: returns all elements with with electron affinity above queried electron affinity", async () => {
        const { body } = await request(app)
          .get("/api/elements?electron_affinity=gt-60")
          .expect(200);

        const convalentRadius = body.every(
          (item) => item.electron_affinity > 60
        );

        expect(convalentRadius).to.be.true;
      });
      it("Status 200: returns all elements with with electron affinity between queried electron affinity", async () => {
        const { body } = await request(app)
          .get("/api/elements?electron_affinity=gt-60_lt-120")
          .expect(200);

        const convalentRadius = body.every(
          (item) => item.electron_affinity > 60 && item.electron_affinity < 120
        );

        expect(convalentRadius).to.be.true;
      });
      it("Status 200: returns all elements with with electronegativity above queried electronegativity", async () => {
        const { body } = await request(app)
          .get("/api/elements?electronegativity=gt-1")
          .expect(200);

        const convalentRadius = body.every(
          (item) => item.electronegativity > 1
        );

        expect(convalentRadius).to.be.true;
      });
      it("Status 200: returns all elements with with electronegativity between queried electronegativity", async () => {
        const { body } = await request(app)
          .get("/api/elements?electronegativity=gt-1_lt-3")
          .expect(200);

        const convalentRadius = body.every(
          (item) => item.electronegativity > 1 && item.electronegativity < 3
        );

        expect(convalentRadius).to.be.true;
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

          expect(body).to.be.an("object");
          expect(body).to.include.keys(
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
          expect(body.element_id).to.be.equal(1);
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
  describe.only("/isotopes", () => {
    describe("GET", () => {
      it("Status 200: returns all isotopes", async () => {
        const { body } = await request(app).get("/api/isotopes").expect(200);

        expect(body).to.be.an("array");
        expect(body[0]).to.include.keys(
          "element_id",
          "isotope_id",
          "name",
          "mass",
          "natural_abundance",
          "half_life"
        );
      });
      it("Status 200: returns all isotopes in database ordered by id in ascending order by default", async () => {
        const { body } = await request(app).get("/api/isotopes").expect(200);

        // @ts-ignore
        expect(body).to.be.sortedBy("isotope_id", { ascending: true });
      });
      it("Status 200: returns all isotopes in database ordered by sort_by query, in ascending order by default", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?sort_by=name")
          .expect(200);

        // @ts-ignore
        expect(body).to.be.ascendingBy("name");
      });
      it("Status 200: returns all isotopes in database ordered sort_by query, in order query", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?sort_by=name&order=desc")
          .expect(200);

        // @ts-ignore
        expect(body).to.be.descendingBy("name");
      });
      it("Status 200: returns first 10 isotopes in database by default", async () => {
        const { body } = await request(app).get("/api/isotopes").expect(200);

        expect(body).to.have.length(10);
      });
      it("Status 200: returns number of isotopes specified in limit query", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?limit=5")
          .expect(200);

        expect(body).to.have.length(5);
      });
      it("Status 200: returns all isotopes with queried mass", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?mass=4")
          .expect(200);

        const mass = body.every((item) => item.mass == 4);

        expect(mass).to.be.true;
      });
      it("Status 200: returns all isotopes with with mass above queried mass", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?mass=gt-10")
          .expect(200);

        const dates = body.every((item) => item.mass > 10);

        expect(dates).to.be.true;
      });
      it("Status 200: returns all isotopes with queried natural abundance", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?natural_abundance=100")
          .expect(200);

        const natural_abundance = body.every(
          (item) => item.natural_abundance == 100
        );

        expect(natural_abundance).to.be.true;
      });
      it("Status 200: returns all isotopes with with natural abundance above queried natural abundance", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?natural_abundance=gt-10")
          .expect(200);

        const natural_abundance = body.every(
          (item) => item.natural_abundance > 10
        );

        expect(natural_abundance).to.be.true;
      });
      it("Status 200: returns all isotopes with queried neutron number", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?neutron_number=100")
          .expect(200);

        const neutron_number = body.every((item) => item.neutron_number == 100);

        expect(neutron_number).to.be.true;
      });
      it("Status 200: returns all isotopes with with neutron number above queried neutron number", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?neutron_number=gt-10")
          .expect(200);

        const neutron_number = body.every((item) => item.neutron_number > 10);

        expect(neutron_number).to.be.true;
      });
      it("Status 200: returns all isotopes for a particular element id", async () => {
        const { body } = await request(app)
          .get("/api/isotopes?element_id=1")
          .expect(200);

        const element_id = body.every((item) => item.element_id == 1);

        expect(element_id).to.be.true;
      });
    });
  });
});
