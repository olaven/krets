//TODO: move this file
import arrayMove from "array-move";


const generate = <T>(direction: Direction, element: T, array: T[]): [number, number, boolean] => {

    const index = array.indexOf(element);

    const nextIndex = direction === "right" ?
        index + 1 :
        index - 1

    const atEnd = nextIndex === -1 || nextIndex === array.length;


    return [index, nextIndex, atEnd];
}

export type Direction = "left" | "right"

/**
 * Returns a function for moving elements in array, 
 * in the given direction
 * @param direction Direction to move 
 */
export const reorder = <T>(direction: Direction) =>
    /**
     * Moves element inside given array
     * @param element element to move 
     * @param array array to move inside of
     */
    (element: T, array: T[]) => {

        const [index, nextIndex, isAtEnd] = generate(direction, element, array);

        return isAtEnd ?
            array :
            arrayMove(array, index, nextIndex);
    }

