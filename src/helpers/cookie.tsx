const cookieName = 'sp-cookie';
let currentCookie = {};

function updateCookieData(data: any): any {
    if (!data) return {};

    currentCookie = { ...currentCookie, ...data };

    return currentCookie;
}

export function checkCookie(params: string[] = []) {
    const cookies = document.cookie.split('; ');

    for (let cookie of cookies) {
        if (cookie.indexOf(cookieName) === 0) {
            const parseCookie = updateCookieData(
                JSON.parse(cookie.replace(`${cookieName}=`, ''))
            );
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

export function setCookie(data: any) {
    if (!data) return;

    const newData = updateCookieData(data);
    const newDate = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;
    const newCookie = `${cookieName}=${JSON.stringify(
        newData
    )}; expires=${new Date(newDate).toUTCString()}`;

    document.cookie = newCookie;
}
