const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      unique: true, // Asegura que cada número de teléfono sea único
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Hash the plain text password before saving
userSchema.pre("save", async function (next) {
  const user = this;

  try {
    if (user.isModified("password")) {
      const salt = await bcrypt.genSalt(8);
      user.password = await bcrypt.hash(user.password, salt);
    }

    next();
  } catch (error) {
    // Handle the error
    console.error(error);
    next(error);
  }
});

module.exports = mongoose.model("User", userSchema);
