/**
 * Created by ttacompu on 11/21/2015.
 */
describe("Filters", function () {
    beforeEach(module('workoutFeature'));
    describe("secondsToTime filter", function () {
        it('should convert integer to time format',inject(function ($filter) {
            expect($filter("secondsToTime")(5)).toBe("00:00:05");
            expect($filter("secondsToTime")(65)).toBe("00:01:05");
            expect($filter("secondsToTime")(3610)).toBe("01:00:10");
        }))
    });
})
