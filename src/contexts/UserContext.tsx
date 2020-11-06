export interface UserInterface {
    uid: null | string;
    name: string | null | undefined;
    rooms: string[];
    lastSession: number;
}

export const defaultUser = {
    uid: null,
    name: null,
    rooms: [],
    lastSession: new Date().getTime(),
};
