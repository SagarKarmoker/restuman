const express = require('express')
require('dotenv').config()
const port = 5000 || process.env.PORT
const winston = require('winston');
const morgan = require('morgan')
const mongoose = require('mongoose');
const Food = require('./models/food.model');
const cors = require('cors');
const Purchase = require('./models/purchase.model');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


const app = express()
app.use(express.json())
app.use(cors({
    origin: ['http://localhost:5173', 'https://merry-peony-faa121.netlify.app'],
    credentials: true
}))
app.use(morgan('combined'))
app.use(cookieParser())

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

mongoose.connect(process.env.MONGOBD_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        logger.error('MongoDB connection error:', err);
    });

app.get('/', (req, res) => {
    res.send('Welcome to the server')
})

// middleware
const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    });
}

// auth api endpoints
app.post('/api/v1/auth', async (req, res) => {
    try {
        const user = req.body;

        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        }).send({
            message: 'User authenticated',
            token: token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/v1/logout', async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        })

        res.send({ message: 'User logged out' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// routes
app.get('/api/v1/highest-sales', async (req, res) => {
    try {
        const foods = await Food.find();

        if (!foods || foods.length === 0) {
            return res.status(404).json({ message: 'No food items found' });
        }

        const highestSales = foods.sort((a, b) => b.purchaseCount - a.purchaseCount).slice(0, 6);

        res.status(200).json(highestSales);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/v1/all-foods', async (req, res) => {
    try {
        const foods = await Food.find();

        if (!foods || foods.length === 0) {
            return res.status(404).json({ message: 'No food items found' });
        }

        res.status(200).json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/v1/food/:id', async (req, res) => {
    try {
        const id = req.params.id;

        console.log("Received ID:", id);

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const foods = await Food.find();

        if (!foods || foods.length === 0) {
            return res.status(404).json({ message: 'No food items found' });
        }

        const food = foods.find((food) => food._id.toString() === id);

        if (!food) {
            return res.status(404).json({ message: 'No food item found' });
        }

        res.status(200).json(food);
    } catch (error) {
        console.error("Error finding food:", error);  // Log the error for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.post('/api/v1/purchase', verifyToken, async (req, res) => {
    try {
        const data = req.body;

        console.log(data.foodId)

        // Validate required fields
        if (!data.foodId || !data.foodName || !data.quantity || !data.price || !data.buyerName || !data.buyerEmail || !data.buyingDate) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Check if the food exists
        const food = await Food.findById(data.foodId);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }

        // Check if the buyer is trying to purchase their own product
        if (food.addBy.email === data.buyerEmail) {
            return res.status(400).json({ message: 'You cannot purchase your own product' });
        }

        // Check if there is enough quantity in stock
        if (food.quantity < data.quantity) {
            return res.status(400).json({ message: 'Not enough stock available' });
        }

        // Calculate the total order value
        const totalOrderValue = data.quantity * data.price;

        // Create the purchase record
        const purchase = await Purchase.create({
            foodId: data.foodId,
            foodName: data.foodName,
            foodQuantity: data.quantity,
            foodPrice: data.price,
            totalOrderValue: totalOrderValue,
            customerName: data.buyerName,
            customerEmail: data.buyerEmail,
            purchaseDate: data.buyingDate,
        });

        // Update the food's quantity
        const updatedFood = await Food.findByIdAndUpdate(
            data.foodId,
            { $inc: { quantity: -data.quantity } },
            { new: true }
        );

        // If food update fails
        if (!updatedFood) {
            return res.status(400).json({ message: 'Failed to update food quantity' });
        }

        // If purchase creation fails
        if (!purchase) {
            return res.status(400).json({ message: 'Failed to create purchase record' });
        }

        // Send success response
        res.status(200).json({ message: 'Purchase successful' });

    } catch (error) {
        console.error('Error occurred during purchase:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/v1/my-foods/:email', verifyToken, async (req, res) => {
    try {
        const email = req.params.email;

        if (email !== req.user.email) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        if (!email) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        const foods = await Food.find({
            addBy: email
        })

        if (!foods || foods.length === 0) {
            return res.status(404).json({ message: 'No food items found' });
        }
        res.status(200).json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.post('/api/v1/add-food', verifyToken, async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        if (data.addByEmail !== req.user.email) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const food = await Food.create({
            foodName: data.foodName,
            foodImage: data.foodImageURL,
            foodCategory: data.foodCategory,
            quantity: data.quantity,
            price: data.price,
            addBy: {
                name: data.addByName,
                email: data.addByEmail,
            },
            foodOrigin: data.foodOrigin,
            shortDescription: data.description,
        });

        if (!food) {
            return res.status(400).json({ message: 'Failed to add food' });
        }

        res.status(201).json({ message: 'Food added successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.get('/api/v1/my-foods', verifyToken, async (req, res) => {
    try {

        const email = req.query.email;

        if (email !== req.user.email) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const foods = await Food.find({
            'addBy.email': email
        });

        if (!foods || foods.length === 0) {
            return res.status(404).json({ message: 'No food items found' });
        }

        res.status(200).json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.patch('/api/v1/update-food/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const foodOwner = await Food.findById(id);

        if (!foodOwner) {
            return res.status(404).json({ message: 'Food item not found' });
        }

        if (req.user.email !== foodOwner.addBy.email) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const food = req.body;

        console.log(food)

        if (!food) {
            return res.status(400).json({ message: 'Invalid data' });
        }

        // Update the food item
        const updatedFood = await Food.findByIdAndUpdate(
            id,
            {
                foodName: food.foodName,
                foodImage: food.foodImageURL,
                foodCategory: food.foodCategory,
                quantity: food.quantity,
                price: food.price,
                foodOrigin: food.foodOrigin,
                shortDescription: food.shortDescription,
                updatedAt: Date.now(),
            },
            { new: true }
        );

        if (!updatedFood) {
            return res.status(400).json({ message: 'Failed to update food' });
        }

        res.status(200).json({ message: 'Food updated successfully', updatedFood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


app.get('/api/v1/my-orders', verifyToken, async (req, res) => {
    try {
        const email = req.query.email;

        if (!email) {
            return res.status(400).json({ message: 'Invalid email' });
        }

        if (email !== req.user.email) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const orders = await Purchase.find({
            customerEmail: email
        });

        if (!orders && orders.length === 0) {
            return res.status(404).json({ message: 'No orders found' });
        }

        res.status(200).json(orders);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/api/v1/delete-order/:id', verifyToken, async (req, res) => {
    try {
        const id = req.params.id;

        console.log(id);

        if (!id) {
            return res.status(400).json({ message: 'Invalid ID' });
        }

        const orderOwner = await Purchase.findById(id);

        if (req.user.email !== orderOwner.customerEmail) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        const deletedFood = await Purchase.findByIdAndDelete(id);

        if (!deletedFood) {
            return res.status(400).json({ message: 'Failed to delete food' });
        }

        res.status(200).json({ message: 'Food deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`App is running ${port}`)
})