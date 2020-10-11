import { Heading } from "rebass";
import * as text from "../text";
import { CategoryCreator } from "../components/Category/categoryCreator";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { CategoriesContextProvider } from "../context/CategoriesContext";
import { CategoryList } from "../components/Category/categoryList";




const CategoriesContent = () => {

    return <>
        <Heading color={"primary"} textAlign={"center"} fontSize={[4, 5, 6]}>{text.myCategories.header}</Heading>
        <Heading color={"black"} textAlign={"center"} fontSize={[0, 1, 2]}>{text.myCategories.inDevelopmentWarning}</Heading>
        <CategoryCreator />
        <CategoryList />
    </>
}

export default () => {

    const { authUser } = useContext(UserContext);
    if (!authUser) {
        return <>
            Denne siden er ikke tilgjengelig uten bruker
        </>
    }

    return <CategoriesContextProvider user={authUser}>
        <CategoriesContent />
    </CategoriesContextProvider>
};