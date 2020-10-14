import { useRouter } from "next/router";
import { NO_CONTENT } from "node-kall";
import { useContext } from "react";
import * as text from "../../text";
import { deletePage } from "../../fetchers";
import { SettingsContext } from "../../context/SettingsContext";
import { DoubleConfirmationButton } from "../standard/buttons";

export const DeletePage = () => {

    const router = useRouter();
    const { page } = useContext(SettingsContext);

    const performDeletion = async () => {

        const [status] = await deletePage(page.id);
        if (status === NO_CONTENT) {

            router.replace("/");
        } else {

            alert(text.settings.deleteError)
        }
    }

    return <DoubleConfirmationButton
        text={text.settings.deletePageButton}
        action={performDeletion}
    />
}