import router, { routesArray } from './../router';

routesArray.map(({ url, test: data }) => {
    test(`Router - ${url}`, () => {
        const value = router({ ...data });

        expect(value).toEqual(url);
    });
});
