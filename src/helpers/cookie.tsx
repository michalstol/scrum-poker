const defaultCookie = 'sp-cookie';

export function checkCookie(name = defaultCookie, params: string[] = []) {
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
        if (cookie.indexOf(name) === 0) {
            const parseCookie = JSON.parse(cookie.replace(`${name}=`, ''));
            let paramsObject: any = {};

            if (params.length === 0) return { ...parseCookie };

            for (let param of params) {
                const tempValue = parseCookie[param];

                if (typeof tempValue !== 'undefined')
                    paramsObject[param] = tempValue;
            }

            return { ...paramsObject };
        }
    }

    return {};
}

export function setCookie(name = defaultCookie, data: any, days = 0) {
    if (!data) return;

    let newCookie = `${name}=${JSON.stringify(data)}`;

    if (days && typeof days === 'number') {
        const newDate = new Date().getTime() + days * 24 * 60 * 60 * 1000;

        newCookie += `; expires=${new Date(newDate).toUTCString()}`;
    }

    document.cookie = newCookie;
}
