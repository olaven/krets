/**
 *
heading: "Integrer med din e-post",
button: {
    on: "Skru på",
    off: "Skru av"
},
explanation: `
    Passer det dårlig å logge inn på Krets?
    Da kan du motta tilbakemeldingene dine på e-post, i nyttige sammendrag.
    E-postene kommer hver 14. dag
`,
placeholder: "e-posten som skal motta"
 */

import { useContext, useState } from "react";
import { NO_CONTENT } from "node-kall";
import * as uiText from "../../../text";
import { validateEmail } from "../../../email";
import { ColumnContainer, RowContainer } from "../../standard/Containers";
import { Button } from "../../standard/Button";
import { TextInput } from "../../standard/Input";
import { UserContext } from "../../../context/UserContext";
import { putUser } from "../../../fetchers";
import { Paragraph } from "../../standard/Text";
import { UserModel } from "../../../models/models";


export const EnableEmailSummaries = () => {

    const { databaseUser, updateUser } = useContext(UserContext);
    const [email, setEmail] = useState(databaseUser.contact_email);

    const text = uiText.settings.email;


    const update = async () => {

        const [status] = await putUser({
            ...databaseUser,
            contact_email: email,
            wants_email_summary: !databaseUser.wants_email_summary,
        });

        if (status !== NO_CONTENT)
            console.error(`${status} when updating`);

        await updateUser();
    }

    return (
        <ColumnContainer>
            <Paragraph>{text.explanation}</Paragraph>
            <RowContainer>
                <TextInput
                    placeholder={text.placeholder}
                    onChange={event => {
                        setEmail(event.target.value);
                    }}
                    value={email}
                />
                <Button
                    onClick={update}
                    disabled={!validateEmail(email)}>
                    {databaseUser.wants_email_summary ?
                        text.button.off :
                        text.button.on
                    }
                </Button>
            </RowContainer >
        </ColumnContainer>
    );
}