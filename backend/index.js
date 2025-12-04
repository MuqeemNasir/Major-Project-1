const express = require('express')
const cors = require('cors')
const app = express()
const {initializeDatabase} = require('./db/db.connect')

app.use(express.json())

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

initializeDatabase()

app.use('/api/users', require('./api/userRoutes'))
app.use('/api/products/', require('./api/productRoutes'))
app.use('/api/categories', require('./api/categoryRoutes'))
app.use('/api/carts', require('./api/cartRoutes'))
app.use('/api/wishlist', require('./api/wishlistRoutes'))
app.use('/api/address', require('./api/addressRoutes'))
app.use('/api/orders', require('./api/orderRoutes'))


app.get('/', (req, res) => res.send("Paintings api are running"))

if(process.env.NODE_ENV !== "serverless"){
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

module.exports = app