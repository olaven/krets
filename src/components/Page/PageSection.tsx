import React, {useContext, useState} from "react";
import {Box} from "rebass";
import {ResponseSection} from "./ResponseSection";
import {UserContext} from "../../context/UserContext";

export const PageSection = props => {

    const { user } = useContext(UserContext);
    const { page } = props;

    return <Box>
        <ResponseSection page={page}/>
    </Box>
};