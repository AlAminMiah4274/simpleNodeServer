const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// a middleware is used to get data from server side correctly
app.use(cors());

// a middleware is used to get data from client side correctly
app.use(express.json());

app.get('/', (req, res) => {
    res.send('simple node server runnig.');
});

const users = [
    { id: 1, name: 'Al Amin Miah', email: 'alaminmiah4274@gmail.com' },
    { id: 2, name: 'Al Amin Khan', email: 'alaminkhan4274@gmail.com' },
    { id: 3, name: 'Al Amin Chowdhury', email: 'alaminchowdhury4274@gmail.com' }
];

// User: dbUser1
// Password: oUsIZDG2z3Yj7I4m

// to get data from server side
app.get('/users', (req, res) => {
    if (req.query.name) {
        const search = req.query.name;
        const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0);
        res.send(filtered);
    }
    else {
        res.send(users);
    }
});

// to get data from client side
app.post('/users', (req, res) => {
    console.log('Post API called');
    const user = req.body;
    user.id = users.length + 1;
    users.push(user);
    console.log(user);
    res.send(user);
});

app.listen(port, () => {
    console.log('Simple node server runnig on port:', port);
});

// mongodb code 
const uri = "mongodb+srv://dbUser1:oUsIZDG2z3Yj7I4m@cluster0.xeddivo.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("simpleNode").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);
