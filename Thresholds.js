import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 2,
    duration: '5s',
    thresholds: {
        http_req_duration: ['p(95)<1000']
    }

}

export default function()
{
    const res = http.get('https://test.k6.io');
   /* check(true, {
        'true is true': (value) => value === true
    });*/
    check(res, {
        'Response is 200': (r)=> r.status === 200,
        'Page is start page' : (r) => r.body.includes('Collection of simple web-pages suitable for load testing.') === true
               });
               sleep(2);
    
}