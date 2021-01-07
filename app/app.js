'use strict'
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const PORT = 8080

/** init server application **/
const app = express()

/** set body-parser **/
app.use(bodyParser.json())


/**
 * Set API routes
 * */

/** Authorization and login routs **/
app.use('/api/auth/', require('./routes/auth.routes'))

/** Production mode **/
if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, '/build')))

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/build/index.html'))
    })
}
/** Start server application **/
async function start() {
    try {
        /** server app listener **/
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    }
    catch (e) {
        console.error(`Server Error`, e.message)
        process.exit(1)
    }
}

/** Start API server **/
start()