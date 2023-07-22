//Frameworks
import mongoose, { ConnectOptions } from 'mongoose';
import express from 'express';
import dotenv from "dotenv";

//Routes
import productRoutes from './routes/products';

// DotEnv to provide .env variables
dotenv.config();

const app = express();
const port = 3000;

// Defining custom type including 'useUnifiedTopology' option
interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
}

// MongoDB connection string
const connectionString = `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@ac-aemgtkt-shard-00-00.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-01.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-02.unqyghm.mongodb.net:27017/?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin`;

// Connect to MongoDB using the custom type
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as CustomConnectOptions)
  .then(() => {
    console.log('Connected to MongoDB successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Middlewares
app.use(express.json());

// Defining routes
app.use('/', productRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
