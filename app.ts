import { Drash } from "./deps.ts";
import { Brand, Response} from "./types.ts"

const { Resource, Server } = Drash.Http 
const { HttpException } = Drash.Exceptions


const responses = new Map<Brand, Response[]>()
const brands = new Map<string, Brand>(); 

const test_company = { name: "test" }; 
brands.set("test", test_company);

responses.set(test_company, [
  {
    indicator: 'smile', 
    comment: "some smile comment"
  }, 
  {
    indicator: 'neutral', 
    comment: "some neutral comment"
  }, 
]); 


class BrandsAPI extends Resource {

  static paths = ["/api/brands"]
}

class BrandAPI extends Resource {


}

export class ResponsesAPI extends Resource {

  static paths = ["/api/brands/:name/responses"]; 
  public GET() {
    
    const name = this.request.getPathParam(":name"); 
    const brand = brands.get(name)
    if (!brand) throw new HttpException(404, "could not find brand")

    const response = responses.get(brand)
    this.response.body = JSON.stringify(response);
    
    return this.response;
  }
}

export const get_server_config = (port: number) => ({
  //address: `localhost:${port}`, 
  response_output: "application/json",
  resources: [ResponsesAPI],
});


//server(1447).run(); 


