export default function () {

    const fetchTodo = async () => {

        const response = await fetch("/api/endpoint");
        const todo = await response.json();
        console.log(response, todo);
    }

    return <button onClick={fetchTodo}>
        fetch todo
    </button>
}