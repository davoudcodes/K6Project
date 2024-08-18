import { check, sleep } from 'k6';
import http from 'k6/http'
import { Counter } from 'k6/metrics';  //first import Counter from k6


export const options =
{
    vus: 1,
    duration: '5s',
    thresholds: {
        http_req_duration : ['p(95)<=6000'],
        my_counter: ['count>2'] // use name defined in counter defintion in braces. 

    }}

    let myCounter = new Counter('my_counter');  //define the counter for use in default function and the counter name for theshold option

export default function ()
{
   const res =  http.get('https://test.k6.io');
   myCounter.add(1); //adds 1 to counter

   sleep(1);
}