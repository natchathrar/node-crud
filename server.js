const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const userController = require('./controllers');
const { validateUserCreation } = require('./validator');

const app = express();
const port = 8000;

app.use(cors());
app.use(bodyParser.json());


app.post('/create', validateUserCreation, userController.createUser);
app.get('/getAll', userController.getAllUsers);
app.get('/get/:id', userController.getUserById);
app.put('/update', userController.updateUser);
app.delete('/delete/:id', userController.deleteUser);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
