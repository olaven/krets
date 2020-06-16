import { AdminPageContext } from "../../context/AdminPageContext"
import { useContext } from "react";

export const ResponseTextList = () => {

    const { responses, responsesLoading } = useContext(AdminPageContext);

    if (responsesLoading || !responses)
        return <div>laster responser..</div>

    if (!responses.length)
        return <div>Ingen responser enda. Del siden din (LINK HER)</div>

    return <div>{
        responses.map(response => <li key={response.id}>
            {response.text}
        </li>)
    }</div>
}