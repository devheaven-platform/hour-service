const { expect, should } = require("chai");

const HourService = require("../../src/services/HourService");

describe("HourService", () => {
    describe("getWorkPeriods", () => {
        before(async () => {
            const newWorkPeriod1 = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const newWorkPeriod2 = {
                context: "Eating",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1500,
                endDate: 2500,
            };

            await HourService.createWorkPeriod(newWorkPeriod1);
            await HourService.createWorkPeriod(newWorkPeriod2);
        });

        it("should return all workperiods", async () => {
            const workperiods = await HourService.getWorkPeriods();

            expect(workperiods.length).to.equal(2);
            expect(workperiods[0].context).to.equal("Just work");
            expect(workperiods[0].employee).to.equal("8d50a412-3f38-458e-be0e-06f0e084afb7");
            expect(workperiods[0].startDate.getTime()).to.equal(1000);
            expect(workperiods[0].endDate.getTime()).to.equal(2000);

            expect(workperiods[1].context).to.equal("Eating");
            expect(workperiods[1].employee).to.equal("8d50a412-3f38-458e-be0e-06f0e084afb7");
            expect(workperiods[1].startDate.getTime()).to.equal(1500);
            expect(workperiods[1].endDate.getTime()).to.equal(2500);
        });
    });

    describe("getWorkPeriodById", () => {
        it("should return one workperiod", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const { id } = await HourService.createWorkPeriod(newWorkPeriod);

            const workperiod = await HourService.getWorkPeriodById(id);

            expect(workperiod.context).to.equal("Just work");
            expect(workperiod.employee).to.equal("8d50a412-3f38-458e-be0e-06f0e084afb7");
            expect(workperiod.startDate.getTime()).to.equal(1000);
            expect(workperiod.endDate.getTime()).to.equal(2000);
        });

        it("should return null if not found", async () => {
            const workperiod = await HourService.getWorkPeriodById("8d50a412-3f38-458e-be0e-06f0e084afb7");

            should().not.exist(workperiod);
        });
    });

    describe("createWorkPeriod", () => {
        it("should create a workperiod", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const workperiod = await HourService.createWorkPeriod(newWorkPeriod);

            expect(workperiod.context).to.equal("Just work");
            expect(workperiod.employee).to.equal("8d50a412-3f38-458e-be0e-06f0e084afb7");
            expect(workperiod.startDate.getTime()).to.equal(1000);
            expect(workperiod.endDate.getTime()).to.equal(2000);
            should().exist(workperiod.id);
        });
    });

    describe("updateWorkPeriod", async () => {
        it("should update a workperiod", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const { id } = await HourService.createWorkPeriod(newWorkPeriod);

            const workperiod = await HourService.updateWorkPeriod(id, {
                context: "Project managing",
                startDate: 3000,
                endDate: 4000,
            });

            expect(workperiod.context).to.equal("Project managing");
            expect(workperiod.startDate.getTime()).to.equal(3000);
            expect(workperiod.endDate.getTime()).to.equal(4000);
        });

        it("should update a workperiod context only", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const { id } = await HourService.createWorkPeriod(newWorkPeriod);

            const workperiod = await HourService.updateWorkPeriod(id, {
                context: "new context",
            });

            expect(workperiod.context).to.equal("new context");
        });

        it("should update a workperiod startDate only", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const { id } = await HourService.createWorkPeriod(newWorkPeriod);

            const workperiod = await HourService.updateWorkPeriod(id, {
                startDate: 1999,
            });

            expect(workperiod.startDate.getTime()).to.equal(1999);
        });

        it("should update a workperiod endDate only", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const { id } = await HourService.createWorkPeriod(newWorkPeriod);

            const workperiod = await HourService.updateWorkPeriod(id, {
                endDate: 5000,
            });

            expect(workperiod.endDate.getTime()).to.equal(5000);
        });

        it("should not update a workperiod without an id", async () => {
            const workperiod = await HourService.updateWorkPeriod("invalid", {
                context: "Something",
            });

            should().not.exist(workperiod);
        });
    });

    describe("deleteWorkPeriod", () => {
        it("should delete a workperiod", async () => {
            const newWorkPeriod = {
                context: "Just work",
                employee: "8d50a412-3f38-458e-be0e-06f0e084afb7",
                startDate: 1000,
                endDate: 2000,
            };
            const { id } = await HourService.createWorkPeriod(newWorkPeriod);

            const workperiod = await HourService.deleteWorkPeriod(id);

            expect(workperiod.id).to.equal(id);
        });

        it("should not delete workperiod with invalid id", async () => {
            const workperiod = await HourService.deleteWorkPeriod("invalid");

            should().not.exist(workperiod);
        });
    });
});
