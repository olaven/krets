import { Box, Card, Flex, Heading } from "rebass";
import React, { useContext } from "react";
import { CategoriesContext } from "../../context/CategoriesContext";

const CategoryCard = ({ name }) => <Box>
    <Heading>{name} {"<-"} name</Heading>
</Box>

export const CategoryList = () => {

    const { categories } = useContext(CategoriesContext);

    /* NOTE: very similar to pagelist! Abstraction?  */
    return <>
        <Flex>
            <Box width={[0, 0, 1 / 4]}></Box>
            <Box width={[1, 1, 2 / 4]}>
                {categories
                    .sort((a, b) => a.created_at < b.created_at ? 1 : -1)
                    .map(category => <CategoryCard key={category.id} {...category} />)}
            </Box>
            <Box width={[0, 0, 1 / 4]}></Box>
        </Flex>
    </>
};
