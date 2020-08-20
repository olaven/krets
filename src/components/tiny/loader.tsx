import { Box } from "rebass";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";

export const Loader = ({ size }: { size: number }) => <Box width={1}>
    < BounceLoader
        css={css`
        display: block;
        margin: 0 auto;
        border-color: teal;`}
        size={100}
        color={"teal"}
    />
</Box >