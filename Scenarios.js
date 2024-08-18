import http from 'k6/http';
import { check } from 'k6';

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
    
}