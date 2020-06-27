import { response } from "../../text";

async function getTodo() {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
    const todo = await response.json();
    return todo;
}

export default async function (request, response) {

    const todo = await getTodo();
    response.send(todo);
}