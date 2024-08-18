import http from 'k6/http';
import { check, sleep } from 'k6';
import exec from 'k6/execution'

export const options = {
    vus: 2,
    duration: '5s',
    thresholds: {
     //   http_req_duration: ['p(95)<1000'],
     //   http_reqs: ['count>2']  //counter
     http_req_failed: ['rate<1'],   //rate
     vus:['value>1'],   //guage
     checks: ['rate>=0.80']  
    }

}

export default function()
{
   const res = http.get('https://test.k6.io');
 //  const res = http.get('https://test.k6.io'+ (exec.scenario.iterationInTest === 1? 'foo' : '' ));

    // exec.scenario.iterationInTest
   /* check(true, {
        'true is true': (value) => value === true
    });*/
    check(res, {
        'Response is 200': (r)=> r.status === 200,
        'Page is start page' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.') === true
               });
               sleep(2);
    
}