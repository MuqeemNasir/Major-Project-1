const express = require('express')
const cors = require('cors')
const app = express()
const {initializeDatabase} = require('./db/db.connect')

const defaultUser = require('./middleware/defaultUser')

app.use(express.json())

const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
}

app.use(cors(corsOptions))

initializeDatabase()

app.use(defaultUser)

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/carts', require('./routes/cartRoutes'))
app.use('/api/wishlist', require('./routes/wishlistRoutes'))
app.use('/api/address', require('./routes/addressRoutes'))
app.use('/api/orders', require('./routes/orderRoutes'))


app.get('/', (req, res) => res.send("Paintings api are running"))

if(process.env.NODE_ENV !== "serverless"){
    const PORT = process.env.PORT || 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

module.exports = app