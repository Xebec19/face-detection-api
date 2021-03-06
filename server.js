import express from 'express';
import cors from 'cors';
import knex from  'knex';  //query builder

const app = express();
const PORT = process.env.PORT || 3000;  //PORT NUMBER
const host = '0.0.0.0'
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

app.use(cors());  //to allow front end to access backend

app.get('/',(req,res) => {  //to check that server is running
	res.send("Hello World!");
})

app.get('/users',(req,res) => {  //to get all users
  
	db.select('*').from('users')
	.then(resp => {
		res.status(200).json(resp);
	})
	.catch(err => res.status(400).json(`An error occured: ${err}`))

})

app.post('/register',(req,res) => {  //to register new users

	const recv = req.body;  //alias for request
	db  //name of database
	//following command insert new user into database
	.insert([{email: recv.email, name: recv.name, password: recv.password }]  
	, ['email','name'])  //return email and name of new user
	.into('users')  //name of table
	.then((resp => {
		res.status(200).json(resp[0])  //send user as response
	}))
	.catch(err => res.status(400).json(`There is an error: ${err}`))
})

app.post('/login',(req,res) => {

	const recv = req.body;  //alias for request
	db('users')  //name of database constant & table
	.where({  //to check email and password
	email: recv.email,
	password:  recv.password
	})
	.select('email','name','entries')  //return email, name and entries
	.then(resp => {
		res.status(200).json(resp[0])  //respond with users details if successful
	})
	.catch(err => res.status(400).json(`There is an error: ${err}`))  //to show error if any occured
})

app.listen(PORT, host ,"0.0.0.0",function(){console.log(`Server is running at ${PORT} & ${host}`);});  //to print port number