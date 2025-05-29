const mongoose = require('mongoose');// Import Mongoose for MongoDB object modeling
const bcrypt = require('bcryptjs'); // Import bcryptjs for password hashing
// Define the User schema with fields and validation
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']// Name is required
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],// Email is required
    unique: true,// Email must be unique
    lowercase: true// Store email in lowercase
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],// Password is required
    minlength: 6,// Minimum length of 6
    select: false  // Do not return password by default in queries
  },
  createdAt: {
    type: Date,
    default: Date.now // Set default value to current date/time
  }
});

// Encrypt password before saving
// Pre-save hook to hash password before saving to database
UserSchema.pre('save', async function(next) {
      // Only hash the password if it has been modified (or is new)
  if (!this.isModified('password')) {
    return next();
  }
  // Generate a salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
// Instance method to compare entered password with hashed password in DB
// Method to compare password for login
UserSchema.methods.matchPassword = async function(enteredPassword) {
    // Returns true if passwords match, false otherwise
    return await bcrypt.compare(enteredPassword, this.password);
};

// Export the User model for use in other files
module.exports = mongoose.model('User', UserSchema);
