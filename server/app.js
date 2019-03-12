const express = require('express')
const graphqlHTTP = require('express-graphql');
const cors = require('cors')

const schema = require('./schema.js')
const mongoose = require('mongoose')
const dbConfig = require('./configs/dbConfig')
const bodyParser  = require('body-parser')



mongoose.connect(dbConfig.url, {
    useCreateIndex: true,
    useNewUrlParser: true
})
.then(res => console.log(`connect`))
.catch(error =>  console.log(error))

const app = express();

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text({ type: 'application/graphql' }));


app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 5000

app.listen(PORT, (err) => {
    if(err) throw err
    console.log(`Server started on port ${PORT}`)
});