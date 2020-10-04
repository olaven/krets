import React from "react";
import { Box } from "rebass";
import { ResponseSection } from "./ReseponseSection/ResponseSection";

export const PageSection = props => {

    const { page } = props;

    return <Box>
        <ResponseSection page={page} showHeader={true} embeddable={{ active: false }} />
    </Box>
};