export const asyncForEach = async <T>(array: T[], callback: (element: T, index: number, all: T[]) => Promise<any>) => {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}