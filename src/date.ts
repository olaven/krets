export const date = (base = new Date()) => ({
    last: (n: number) => ({
        day: () => new Date(
            base.getTime() - 1000 * 60 * 60 * 24 * n
        ),
        year: () => new Date(
            base.setFullYear(base.getFullYear() - n),
        ),
    }),
});