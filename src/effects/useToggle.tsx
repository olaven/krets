import { useState } from "react";

export const useToggle = (initial: boolean): [boolean, () => any] => {

    const [value, setValue] = useState(initial);
    const toggle = () => {

        setValue(!value);
    }

    return [
        value,
        toggle
    ]
}
