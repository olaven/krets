import { app } from "./deps.ts";
import { handlers } from "./handlers/handlers.ts";

app(...handlers);

import { App } from "./public/app.tsx";