import React from "react";
import { Box } from "rebass";
import { ResponseSection } from "./ResponseSection";

export const PageSection = props => {

    const { page } = props;

    return <Box>
        <ResponseSection page={page} />
    </Box>
};