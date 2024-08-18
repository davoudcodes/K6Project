import { sleep } from "k6";
import http from "k6/http";
import { Trend } from "k6/metrics";

export const options = {
    vus: 2,
    duration: '5s',
    thresholds: {
        newspageresponsetime : ['p(95)<=2000']


    }
};
// let myCounter = new Counter('my_counter');
let newsPageResponseTime = new Trend('newspageresponsetime');

export default function()
{
    let res =http.get('https://test.k6.io');
    sleep(1);
     res = http.get('https://test.k6.io/news.php');
   newsPageResponseTime.add(res.timings.waiting);
   // myCounter.add(1);
    sleep(1);
}