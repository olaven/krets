import { NextApiRequest, NextApiResponse } from "next";

const fetchTodo = async () => {

    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (response.status === 200) {

        const todo = await response.json();
        return todo;
    }

    return null;
}

export default async function (request: NextApiRequest, response: NextApiResponse) {

    const todo = await fetchTodo();
    response.json(todo);
}