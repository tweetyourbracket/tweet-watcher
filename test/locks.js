var assert = require('assert');
var moment = require('moment');
var Locks = require('../lib/locks');

var year = '2013';
var sport = 'ncaa-mens-basketball';
var ONE_DAY = 1000 * 60 * 60 * 24;


describe('Locks', function () {
    it('Works with a sport year', function (done) {
        var locks = new Locks({year: year, sport: sport});

        assert.equal(locks.isOpen(), false);
        assert.equal(locks.moment('calendar'), '03/21/2014');

        done();
    });

    it('Works with a future lock time', function (done) {
        var future = moment().add(ONE_DAY, 'ms').utc().format();
        var locks = new Locks({locks: future});

        assert.equal(locks.isOpen(), true);
        assert.ok(locks.closesIn() > ONE_DAY - 10000);

        done();
    });
});