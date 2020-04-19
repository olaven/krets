import { get, renderFile } from "../../../deps.ts"
import { template_path } from "./utils.ts"

const homepage_handler = get("/", async () => {

    const path = template_path("home.ejs");
    const rendered = await renderFile(path, {});
    return rendered;
}); 

export const frontend_handlers = [
    homepage_handler
];