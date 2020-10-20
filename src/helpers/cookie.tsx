export function checkCookie(name = 'sp-cookie') {
    const cookies: string[] = document.cookie.split('; ');

    for (let cookie of cookies) {
        if (cookie.indexOf(name) === 0) {
            const parseCookie = JSON.parse(cookie.replace(`${name}=`, ''));

            return { ...parseCookie };
        }
    }

    return {};
}
