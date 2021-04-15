export const scrumPoints = [0, 0.5, 1, 2, 3, 5, 8, 13, 20, 40, 100];

export function formatNumber(value: number): string | number {
    switch (value) {
        case -1:
            return 0;
        case 0.5:
            return '½';
        default:
            return value;
    }
}
