import { Application, Context, NotFoundException, ConflictException, BadRequestException } from "./deps.ts";

const app = new Application();

interface Feedback {
  company_name: string, 
  indicator: 'smile' | 'neutral' | 'bad', 
  comment: string
}

interface Company extends Record<string, any> {
  name: string
}

const database = new Map<string, Company>(); 
database.set("test", {
  name: "test"
});

app
  .get("/:company_name", (context: Context) => {
    
    console.log(JSON.stringify(context, null, 4))

    const { company_name } = context.params; 
    const company = database.get(company_name); 

    if (!company) 
      throw new NotFoundException('Could not find this company');
    
    return context.json(company);
  })
  .post("/", async (context: Context) => {

    const company = (await context.body()) as Company
    if (!company.name)
      throw new BadRequestException("name has to be defined and feedbacks have to be an empty array."); 

    if (database.get(company.name))
      throw new ConflictException("a company with this name is already defined."); 

    database.set(company.name, company); 
    return context.json({
      code: 201, 
      info: "company, created"
    }, 201);
  })
  .get("/:company_name/feedbacks", (context: Context) => {

    const company = await context.body()) as Company;
  })
  .post("/:company_name/feedbacks", (context: Context) => {

    
  })
  .start({ port: 8080 });

console.log("server is running.");