const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
}).catch(err => console.log(err));

const User = require('./models/User');

async function updatePasswords() {
  const users = [
    { email: 'test@test.lt', password: 'test' },
    { email: 'la@la.lt', password: 'lalala' }
  ];

  for (const user of users) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    await User.findOneAndUpdate({ email: user.email }, { password: hashedPassword });
    console.log(`Updated password for ${user.email}`);
  }

  mongoose.connection.close();
}

updatePasswords();
