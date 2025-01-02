const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Res :',req.url, req.method)

    if(req.method == 'POST'){
        let  body = '';
        req.on('data',(chunk) => {
            // console.log(chunk,":chunk")
            body += chunk.toString();
        })

        req.on('end', ()=>{
            const dataOfBody = JSON.parse(body)
            // console.log("dataOfBody:",dataOfBody)
            switch(dataOfBody.event){
                case 'add':
                    res.end(`Num1: ${dataOfBody.num1} + Num2: ${dataOfBody.num2} = ${dataOfBody.num1 + dataOfBody.num2}`);
                    break;
                case 'sub':
                    if(dataOfBody.num1 < dataOfBody.num2){
                        res.end(`Num1 < Num2 ${dataOfBody.num1} < ${dataOfBody.num2} Wrong input`);
                    }else{
                        res.end(`Num1: ${dataOfBody.num1} - Num2: ${dataOfBody.num2} = ${dataOfBody.num1 - dataOfBody.num2}`);
                    }
                    break;
                case 'mul':
                    res.end(`Num1: ${dataOfBody.num1} * Num2: ${dataOfBody.num2} = ${dataOfBody.num1 * dataOfBody.num2}`);
                    break;
                case 'div':
                    if(dataOfBody.num2 == 0){
                        res.end(`Num2 cannot be zero`);
                    }else{
                        res.end(`Num1: ${dataOfBody.num1} / Num2: ${dataOfBody.num2} = ${dataOfBody.num1 / dataOfBody.num2}`);
                    } 
                    break;
                default: 
                    res.statusCode = 404;
                    res.end(`Invalid req`);
            }
            
        })
        
    }else{
        res.statusCode = 400
        res.end('Invalid request!')
    }
})

server.listen(3000, 'localhost', ()=>{
    console.log('Listing to port 3000!')
})