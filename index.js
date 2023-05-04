const express = require('express');
const cors = require('cors');
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