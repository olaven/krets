import { usePagination } from "../effects/usePagination";

export default () => {

    const [page, getNext] = usePagination("/api/pages/test/responses");

    const logCurrent = async () => {

        console.log("page", page);
    }
    return <div>

        <button onClick={logCurrent}>logCurrent</button>
        <button onClick={getNext}>getNext</button>
    </div>
}