

//NOTE: THIS IS NOT USED, AS CATEGORIES IS NOT A FEATURE THAT IS LAUNCHED ATM
//TODO: actually when/if categories are used 

import { useContext } from "react";
import { Box } from "rebass";
import { Label, Select } from "@rebass/forms";
import { HomeContext } from "../../context/HomeContext";

//TODO: actually pull categories (from context etc.)
export const UpdateCategory = () => {

    const { page } = useContext(HomeContext);
    const options = [
        { value: "first_id", name: "My First Category" },
        { value: "second_id", name: "My Second Category" },
        { value: "third_id", name: "My Third Category" },
        { value: "fourth_id", name: "My Fourth Category" },
    ]

    return <Box>
        <Label htmlFor='category'>Kategori</Label>
        <Select
            id='category'
            name='category'>
            {options.map(({ value, name }) => <option value={value}>{name}</option>)}
        </Select>
        her skal jeg oppdatere kategori for {page.name}
    </Box>
}