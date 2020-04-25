import { client_render } from "../client.js";
import { Brand } from "./brand.js";

const WitnName = () => Brand({name: "HEI"})
client_render(WitnName);