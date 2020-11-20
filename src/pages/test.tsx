import { AdminWrapper } from "../components/AdminWrapper";

export default AdminWrapper(() => {


    const onClick = async () => {

        const repsonse = fetch("http://localhost:3000/api/cron/email-summary-trigger", {
            headers: {
                "x-krets-email-summary-secret": "some-random-token"
            }
        });
        console.log(repsonse);
    }

    return <>
        <button onClick={onClick}>Trigger Summary</button>
    </>
})