import router, { routesArray } from './../router';

routesArray.map(route => {
    test(`Router - ${route.url}`, () => {
        const value = router({ ...route.test });

        expect(value).toEqual(route.url);
    });
});
