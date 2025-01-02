const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

app.post('/',(req, res)=>{
  const {num1, num2, event} = req.body;
            switch(event){
                    case 'add':
                        res.end(`Num1: ${num1} + Num2: ${num2} = ${num1 + num2}`);
                        break;
                    case 'sub':
                        if(num1 < num2){
                            res.end(`Num1 < Num2 ${num1} < ${num2} Wrong input`);
                        }else{
                            res.end(`Num1: ${num1} - Num2: ${num2} = ${num1 - num2}`);
                        }
                        break;
                    case 'mul':
                        res.end(`Num1: ${num1} * Num2: ${num2} = ${num1 * num2}`);
                        break;
                    case 'div':
                        if(num2 == 0){
                            res.end(`Num2 cannot be zero`);
                        }else{
                            res.end(`Num1: ${num1} / Num2: ${num2} = ${num1 / num2}`);
                        } 
                        break;
                    default: 
                        res.statusCode = 404;
                        res.end(`Invalid req`);
                }
})

app.listen(3000, ()=>{
    console.log('Listing to port 3000!')
})

