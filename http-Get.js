import http from "k6/http";
import { check } from "k6";

export default function()
{
    
   let res = http.get('https://test-api.k6.io/public/crocodiles/');
   const crocodiles = res.json();
   const crocId = crocodiles[0].id;
   const crocName = crocodiles[0].name;
   //console.log(res);

   res = http.get(`https://test-api.k6.io/public/crocodiles/${crocId}/`);
   //console.log(res.json());
//   console.log(res.headers.Allow);
console.log(res.headers['Content-Type']);
   check(res,  {
    'Status is 200' : (r)=> r.status === 200,
    'Croc name ' : (r)=> r.json().name === crocName
   });

}