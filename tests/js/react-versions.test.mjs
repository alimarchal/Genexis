import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const lock = JSON.parse(readFileSync(new URL('../../package-lock.json', import.meta.url), 'utf8'));
const version = (name) => lock.packages[`node_modules/${name}`].version;

// React refuses to start (error #527) when react and react-dom differ, which blanks every page.
test('react and react-dom are locked to the same version', () => {
    assert.equal(version('react-dom'), version('react'));
});
