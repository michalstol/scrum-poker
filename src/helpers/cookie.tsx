import { AuthInterface, defaultAuth } from './../contexts/AppContext';

const cookieName = 'sp-cookie';

export function checkCookie(): AuthInterface {
    const cookies: string[] = document.cookie.split('; ');

    for (let cookie of cookies) {
        if (cookie.indexOf(cookieName) === 0) {
            const parseCookie = JSON.parse(
                cookie.replace(`${cookieName}=`, '')
            );

            return { ...parseCookie };
        }
    }

    return { ...defaultAuth };
}
