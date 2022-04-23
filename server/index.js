const cors = require('cors')
const express = require('express')
const dotenv = require('dotenv').config()
const connectDB = require('./config/database')
const { errorHandler } = require('./middleware/errorMiddleware');
const path = require('path');

connectDB()

const app = express()
const PORT = process.env.PORT || 5000
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }))


app.use('/api/lists', require('./route/listRoute'));
app.use('/api/users', require('./route/userRoute'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html')))
} else {
    app.get('/', (req, res) => res.send('Please set environment to production'))
}

app.use(errorHandler);


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))