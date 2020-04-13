import { with_app, test_post, test_get } from "../test_utils.ts"
import { response_handlers } from "./response_handlers.ts"
import { Response } from "../types.ts";
import { brand_handlers } from "../brand/brand_handlers.ts";


/*  
NOTE: contains both response and brand endpoints, 
as brand-endpoints are needed in test */
export const with_response_app = (action: (port: number) => any) => 
    with_app([...brand_handlers, ...response_handlers], action); 

export const get_responses = async (port: number, brand_name: string) => 
    test_get(`http://localhost:${port}/api/brands/${brand_name}/responses`); 

export const post_response = async (port: number, brand_name: string, response: Response) => 
    test_post(`http://localhost:${port}/api/brands/${brand_name}/responses`, response); 
    ///api/brands/:brand_name/responses