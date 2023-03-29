import mongoose from 'mongoose';

// Set the value of `strictQuery` explicitly
// Choose either true or false based on your preference
mongoose.set('strictQuery', true);

const CONNECTION_STATES = {
   DISCONNECTED: 0,
   CONNECTED: 1,
   CONNECTING: 2,
   DISCONNECTING: 3,
};

const mongoConnection = {
   isConnected: CONNECTION_STATES.DISCONNECTED,
};

export const connect = async () => {
   if (mongoConnection.isConnected === CONNECTION_STATES.CONNECTED) {
      console.log('We are already connected');
      return;
   }

   if (mongoose.connections.length > 0) {
      mongoConnection.isConnected = mongoose.connections[0].readyState;

      if (mongoConnection.isConnected === CONNECTION_STATES.CONNECTED) {
         console.log('Using previous connection');
         return;
      }

      await mongoose.disconnect();
   }

   try {
      await mongoose.connect(process.env.MONGO_URL || '');
      mongoConnection.isConnected = CONNECTION_STATES.CONNECTED;
      console.log('Connected to MongoDB:', process.env.MONGO_URL);
   } catch (error) {
      console.error('Error connecting to MongoDB:', error);
   }
};

export const disconnect = async () => {
   if (process.env.NODE_ENV === 'development') return;

   if (mongoConnection.isConnected === CONNECTION_STATES.DISCONNECTED) return;

   await mongoose.disconnect();
   mongoConnection.isConnected = CONNECTION_STATES.DISCONNECTED;

   console.log('Disconnected from MongoDB');
};
