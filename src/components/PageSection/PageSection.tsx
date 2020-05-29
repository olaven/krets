import React, {useContext, useEffect} from "react";
import {PagesContext, PagesContextProvider} from "../../context/PagesContext";

const PageCreator = () => {

    return <p>Lag din Krets-side:</p>
};


export const PageList = () => {

    const {pages} = useContext(PagesContext);

    return <div>
        Dine krets-sider:
        {pages.map(page => <div>
            {page}
        </div>)}
    </div>

};

export const PageSection = () => (<PagesContextProvider>

    <PageCreator/>
    <PageList/>
</PagesContextProvider>);