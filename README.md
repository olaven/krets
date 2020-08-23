# Krets [![codebeat badge](https://codebeat.co/badges/80e5554c-7098-4a51-bef5-8bae46562b57)](https://codebeat.co/projects/github-com-olaven-krets-master) ![Tests](https://github.com/olaven/krets/workflows/Tests/badge.svg)
<img width="200" alt="Logo" src="./public/logo.svg">

## :wave: Welcome 
[Krets](https://krets.app) is a useful tool for getting feedback. The idea is that giving feedback should be as simple as possible. 
Ideally, completely frictionless. 

## Local setup 
Running Krets requires a recent version of [nodejs](https://nodejs.org/en/) and [postgres](https://www.postgresql.org/) running locally. 
This can be manually set up and installed, or it can be started with ["devcontainers" in vscode](https://code.visualstudio.com/docs/remote/containers). 
The latter just requires the [remote development extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) and clicking 
"reopen in container" when VSCode starts. 

In addition, a `.env`-file must be created at the root of the project. It must contain: 
```
AUTH0_DOMAIN=<YOUR_VARIABLE_HERE>
AUTH0_CLIENT_ID=<YOUR_VARIABLE_HERE>
AUTH0_CLIENT_SECRET=<YOUR_VARIABLE_HERE>
REDIRECT_URI=<YOUR_VARIABLE_HERE>
POST_LOGOUT_REDIRECT_URI=<YOUR_VARIABLE_HERE>
SESSION_COOKIE_SECRET=<YOUR_VARIABLE_HERE>



PGHOST=<YOUR_VARIABLE_HERE> # db if using devcontainers
PGUSER=<YOUR_VARIABLE_HERE> # user if using devcontainers
PGPASSWORD=<YOUR_VARIABLE_HERE> # pass if using devcontainers
PGDATABASE=<YOUR_VARIABLE_HERE> # data if using devcontainers

STRIPE_WEBHOOK_SECRET=<YOUR_VARIABLE_HERE>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<YOUR_VARIABLE_HERE>
STRIPE_SECRET_KEY=<YOUR_VARIABLE_HERE>

CONTACT_EMAIL=<YOUR_VARIABLE_HERE>
```


