import { Text } from "rebass";

/**
 * A tiny text box for use on information pages. 
 */
export const TextBox = ({ children }) => <Text fontSize={[2, 3, 4]} my={[1, 2, 3]}>
    {children}
</Text>