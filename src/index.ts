import express from 'express';
import mongoose, { ConnectOptions } from 'mongoose';

const app = express();
const port = 3000;

// Defining custom type including 'useUnifiedTopology' option
interface CustomConnectOptions extends ConnectOptions {
  useUnifiedTopology: boolean;
}

// MongoDB connection string (replace "<password>" with the actual password)
const connectionString =
  'mongodb://drenvio:moM5f3AodwLE5d0A@ac-aemgtkt-shard-00-00.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-01.unqyghm.mongodb.net:27017,ac-aemgtkt-shard-00-02.unqyghm.mongodb.net:27017/?replicaSet=atlas-y8oxsk-shard-0&ssl=true&authSource=admin';

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

// Defining routes and middleware here (after connecting to MongoDB)



// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
