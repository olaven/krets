import React, {useContext, useEffect} from "react";
import {PagesContext, PagesContextProvider} from "../../context/PagesContext";

const PageCreator = () => {


};


export const PageList = () => {

    const {pages} = useContext(PagesContext);

    return pages.map(page => <div>
        page: {page};
    </div>)
};

export const PageSection = () => <PagesContextProvider>

    Lag din Krets-side
</PagesContextProvider>;