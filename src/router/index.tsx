import { atom } from 'recoil';

export const routerState = atom({
    key: 'router',
    default: window.location.pathname,
});

export function redirect(url: string): boolean {
    if (!url) return false;

    window.history.replaceState(null, '', url);
    return window.dispatchEvent(new Event('locationchange'));
}
