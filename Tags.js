import http from "k6/http";


export const options =
{
    thresholds: {
        http_req_duration:['p(95)<=1000'],
        'http_req_duration{status:200}': ['p(95)<=1000']  //tag with inbuilt property
    }
}

export default function()cls
{
    http.get('https://run.mocky.io/v3/f5ae742d-bd2c-4548-a811-1ffa974bab35');   //generate 200 and 201 on mocky.io
    http.get('https://run.mocky.io/v3/e87c4f63-027f-4aaa-a635-0a744318d776?mocky-delay=1500ms'); //simulated delay to fail req duration check

}