"use strict";

describe('DemoController', function() {

    var ctrl,
        service;

    beforeEach(function () {
        module('onePOS');

        inject(function ($controller) {
            ctrl = $controller('DemoController', {loginService:service});
        });

    });

    it("should be defined", function () {
        expect(ctrl).toBeDefined();
        // expect(service).toBeDefined();
    });

    describe("Initialization", function () {

        it("should initiate counter", function () {
            expect(ctrl.counter).toBe(0);
        });
    });

    describe("Actions", function () {
        describe('incrementCounter', function () {
            it('should increment the counter', function () {
                ctrl.incrementCounter();
                expect(ctrl.counter).toBe(1);
            });
        });


    });
});