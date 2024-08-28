import http from "k6/http";

export default function()
{
    const credentials = {
        username: 'test_'+ Date.now(),
        password:  'secret_'+ Date.now()
    };
    
    
    http.post('https://test-api.k6.io/user/register/',
        JSON.stringify(credentials), 
        {
            headers : {
                'Content-Type': 'application/json'
            }
        }
        );

    let res = http.post(
        'https://test-api.k6.io/auth/token/login/', 
         JSON.stringify(
            {
                username: credentials.username,
                password: credentials.password
            }
         ), 
         {
            headers : {
                'Content-Type': 'application/json'
            }
        });

        const resToken= res.json().access;
        console.log(resToken);
}