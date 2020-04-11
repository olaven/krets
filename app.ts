import { Application, Context, NotFoundException, ConflictException, BadRequestException, MiddlewareFunc, HandlerFunc } from "./deps.ts";
import React from "https://dev.jspm.io/react";
import ReactDOMServer from "https://dev.jspm.io/react-dom/server";
import { Basic } from "./frontend/basic.jsx";
import { CompanyFrontend } from "./frontend/company.jsx";

const app = new Application();

interface Feedback extends Record<string, any> {
  indicator: 'smile' | 'neutral' | 'bad', 
  comment: string
}

interface Company extends Record<string, any> {
  name: string
}

const feedbacks = new Map<Company, Feedback[]>()
const companies = new Map<string, Company>(); 

const test_company = { name: "test" }; 
companies.set("test", test_company);

feedbacks.set(test_company, [
  {
    indicator: 'smile', 
    comment: "some smile comment"
  }, 
  {
    indicator: 'neutral', 
    comment: "some neutral comment"
  }, 
]); 


app.use((next) =>
  (c) => {
    let e = next(c);
    if (React.isValidElement(e)) {
      e = ReactDOMServer.renderToString(e);
    }

    return e;
  }
);

app
  .get("/", (context: Context) => {

    return Basic()
  })
  .get("/site/:company_name", (context: Context) => {

    const { company_name } = context.params; 
    const company = companies.get(company_name);
    return CompanyFrontend({company});
  })
  .get("api/companies/:company_name", (context: Context) => {
    
    console.log(JSON.stringify(context, null, 4))

    const { company_name } = context.params; 
    const company = companies.get(company_name); 

    if (!company) 
      throw new NotFoundException('Could not find this company');
    
    return context.json(company);
  })
  .post("api/companies", async (context: Context) => {

    const company = (await context.body()) as Company
    if (!company.name)
      throw new BadRequestException("name has to be defined and feedbacks have to be an empty array."); 

    if (companies.get(company.name))
      throw new ConflictException("a company with this name is already defined."); 

    companies.set(company.name, company); 
    return context.json({
      code: 201, 
      info: "company created"
    }, 201);
  })
  .get("/api/companies/:company_name/feedbacks", async (context: Context) => {

    const company = (await context.body()) as Company;
    const body = feedbacks.get(company)!; 
    return context.json(body);
  })
  .post("/api/cmpanies/:company_name/feedbacks", async (context: Context) => {

    const { company_name } = context.params; 
    const feedback = (await context.body()) as Feedback;

    const company = companies.get(company_name)!
    feedbacks.get(company)?.push(feedback);
    
    return context.json({
      code: 201, 
      info: "feedback created"
    }, 201);
  })
  .start({ port: 8080 });

console.log("server is running.");