import { Box } from "rebass";
import BounceLoader from "react-spinners/BounceLoader";
import { css } from "@emotion/core";
import { LoadMoreButton } from "./buttons";

export const Loader = ({ size }: { size: number }) => <Box width={1}>
    <span aria-label="loader-label">
        < BounceLoader
            css={css`
                display: block;
                margin: 0 auto;`}
            size={size}
            color={"#0A585C"} //old: teal
        />
    </span>
</Box >



export const LoadMore = ({ onClick, active, isLoading }) => {
    if (!active)
        return null;

    if (isLoading)
        return <Loader size={10} />

    return <LoadMoreButton onClick={onClick} />
}

