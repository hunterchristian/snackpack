/* This is a database connection function*/
import mongoose from 'mongoose';

interface Connection {
  isConnected: boolean;
}
const connection: Connection = {
  isConnected: false,
}; /* creating connection object*/

async function connect() {
  /* check if we have connection to our databse*/
  if (connection.isConnected) {
    return;
  }

  /* connecting to our database */
  const db = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  connection.isConnected = !!db.connections[0].readyState;
}

export default connect;
