import { useContext, useEffect, useState } from "react";
import { AdminPageContext } from "../../../context/AdminPageContext";
import { CompareContext } from "../../../context/CompareContext";
import { LineChart } from "./LineChart";
import { BarChart } from "./BarChart";


export const Charts = () => {

    const { page } = useContext(AdminPageContext);
    const { pageInformations, setSelected } = useContext(CompareContext);

    useEffect(() => {
        setSelected([page.id]);
    }, []);


    return <>
        <LineChart pageInformations={pageInformations} />
        <BarChart pageInformations={pageInformations} />
    </>;
}