import { styled } from "../../stiches.config";

export const StichesButton = styled('button', {
    borderRadius: '50px',
    fontSize: '1.5em',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '16px',
    paddingRight: '16px',
    ':hover': {
        cursor: 'pointer'
    },
    small: {
        backgroundColor: 'red',
    },
    large: {
        backgroundColor: 'blue'
    }
});

export const WithHoverColor = styled(StichesButton, {
    backgroudnColor: "purple",
    ":hover": {
        backgroundColor: "pink"
    }
});