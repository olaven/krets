import { React } from "../../../frontend_deps.ts";

export const Register = () => {

    const [name, setName] = React.useState("");

    const onClick = () => {

        console.log(setName);
        setName("Test")
    }

    return <>
        <div>HER {name}</div>
        <input type="text" placeholder="Registrer din tjeneste!"></input>
        <button onClick={onClick}>Registrer</button>
    </>
}