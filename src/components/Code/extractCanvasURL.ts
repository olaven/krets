
export const extractCanvasURL = (selector: string) =>
    () =>
        cast<HTMLCanvasElement>(
            document
                .querySelector(selector)
        ).toDataURL();

const cast = <T>(t: any) => t as T