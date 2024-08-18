import { check, sleep } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";
//import Tags from "./Tags";

export const options = {
    thresholds : {
        http_req_duration : ['p(95)<=2000'],
        'http_req_duration{page:order}' : ['p(95)<2000'],
        checks : ['rate>=0.1'],
        'checks{page:order}' : ['rate>=0.1'],
        httperrors : ['count==0'],
        'httperrors{page:order}' : ['count==0']


    }

};
let httpErrors = new Counter('httperrors');

export default function()
{
    
   let res = http.get('https://run.mocky.io/v3/f5ae742d-bd2c-4548-a811-1ffa974bab35');
   if(res.error)
   {
    httpErrors.add(1);
   }
   check(res, {
    'status is 200': (r)=> r.status === 200
   });

   //order request
   res = http.get('https://run.mocky.io/v3/e87c4f63-027f-4aaa-a635-0a744318d776?mocky-delay=1500ms',
    {
    tags: {
        page :'order'
          } 
        }
   );
   if(res.error)
    {
     httpErrors.add(1, { page: 'order'});
    }
    check(res, {
     'status is 200': (r)=> r.status === 201
    }, { page: 'order'});

    sleep(1);
}