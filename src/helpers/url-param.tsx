export function getURLParam(name: string): object {
    const href = decodeURI(window.location.href);

    if (!name || href.indexOf(`${name}=`) === -1 || href.indexOf('?') === -1)
        return {};

    const params = href.split('?')[1].split('&');

    for (let target of params) {
        if (target.indexOf(`${name}=`) === 0) {
            const value = target.replace(`${name}=`, '');
            const param: any = {};

            param[name] = value;

            return { ...param };
        }
    }

    return {};
}
