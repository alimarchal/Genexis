import assert from 'node:assert/strict';
import { test } from 'node:test';
import { monthlyInstalment } from '../../resources/js/lib/loan.ts';

const close = (actual, expected, tolerance = 0.01) =>
    assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} is not within ${tolerance} of ${expected}`);

test('matches the standard annuity formula', () => {
    // 1,000,000 at 12% p.a. over 12 months: 88,848.79 per month
    close(monthlyInstalment(1_000_000, 12, 12), 88_848.79);
    // 500,000 at 15% p.a. over 60 months: 11,894.97 per month
    close(monthlyInstalment(500_000, 15, 60), 11_894.97);
});

test('instalments repay exactly principal plus markup', () => {
    const principal = 750_000;
    const months = 36;
    const monthlyRate = 0.14 / 12;
    const emi = monthlyInstalment(principal, 14, months);

    let balance = principal;
    for (let month = 0; month < months; month++) {
        balance = balance * (1 + monthlyRate) - emi;
    }
    close(balance, 0, 0.001);
});

test('a 0% rate spreads the principal evenly instead of returning NaN', () => {
    assert.equal(monthlyInstalment(120_000, 0, 12), 10_000);
    assert.ok(!Number.isNaN(monthlyInstalment(1, 0, 3)));
});

test('invalid input yields 0, never NaN or Infinity', () => {
    for (const [principal, rate, months] of [
        [0, 10, 12],
        [-5, 10, 12],
        [1000, 10, 0],
        [1000, 10, -3],
        [NaN, 10, 12],
        [1000, NaN, 12],
        [Infinity, 10, 12],
    ]) {
        assert.equal(monthlyInstalment(principal, rate, months), 0);
    }
});

test('a higher rate always costs more per month', () => {
    assert.ok(monthlyInstalment(300_000, 20, 24) > monthlyInstalment(300_000, 10, 24));
});

test('a very high rate and long tenure stay finite', () => {
    assert.ok(Number.isFinite(monthlyInstalment(10_000_000, 100, 240)));
});
