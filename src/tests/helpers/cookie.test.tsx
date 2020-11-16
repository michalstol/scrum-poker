// import React from 'react';
// import { render } from '@testing-library/react';

import { cookieName, saveCookie, readCookie } from './../../helpers/cookie';

const testedValue = {
    authenticated: true,
    userName: 'ęźĆ Name',
    roomID: '8EcZSYBg04ahWXVASklF',
    role: 'player',
};

test('readCookie', () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: encodeURI(`${cookieName}=${JSON.stringify(testedValue)}`),
    });

    const valueAfter = readCookie();

    expect(valueAfter).toEqual(testedValue);
});

test('saveCookie', () => {
    Object.defineProperty(window.document, 'cookie', {
        writable: true,
        value: '',
    });

    saveCookie({ ...testedValue });

    const valueAfter = JSON.parse(
        decodeURI(window.document.cookie.split('=')[1].split(';')[0])
    );

    expect(valueAfter).toEqual(testedValue);
});
