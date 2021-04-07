import { getURLParam } from './../url-param';

const testedValue = '8EcZSYBg04ahWXVASklF';

test('getURLParam', () => {
    Object.defineProperty(window, 'location', {
        writable: true,
        value: {
            href: `https://test.test?param=${encodeURI(testedValue)}`,
        },
    });

    const valueAfter = getURLParam('param');

    expect(valueAfter).toEqual({ param: testedValue });
});
