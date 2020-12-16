import express from 'express';


const app = express();
const port = process.env.port || 3000;  //PORT NUMBER


app.use(express.urlencoded({extended:false}));  //alternative for body-parsar
app.use(express.json());


app.get('/',(req,res) => {
	res.send("Hello World!");
})

app.listen(port ,() => {console.log(`Server is running at ${port}`)})  //to print port number