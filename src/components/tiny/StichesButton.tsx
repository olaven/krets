import { styled } from "../../stiches.config";

export const StichesButton = styled('button', {
    backgroundColor: 'orange',
    borderRadius: '50px',
    fontSize: '1.5em',
    paddingTop: '10px',
    paddingBottom: '10px',
    paddingLeft: '16px',
    paddingRight: '16px',
    ':hover': {
        cursor: 'pointer'
    }
});

export const WithHoverColor = styled(StichesButton, {
    backgroudnColor: "purple",
    ":hover": {
        backgroundColor: "pink"
    }
});