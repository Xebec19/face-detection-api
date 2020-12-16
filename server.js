import express from 'express';
import knex from  'knex';  //query builder

const app = express();
const port = process.env.port || 3000;  //PORT NUMBER
var db = knex({
  client: 'pg',  //pg stands for postgresql
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'root',  //DON'T LOOK HERE IT IS CONFIDENTIAL
    database : 'fbdb'  //name of database
  }
});

app.use(express.urlencoded({extended:false}));  //alternative for body-parsar
app.use(express.json());


app.get('/',(req,res) => {
	res.send("Hello World!");
})

app.get('/users',(req,res) => {
  
	db.select('*').from('users')
	.then(resp => {
		res.status(200).json(resp);
	})
	.catch(err => res.status(400).json(`An error occured: ${err}`))

})

app.listen(port ,() => {console.log(`Server is running at ${port}`)})  //to print port number