const mongoose = require("mongoose");

// schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    photo: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ["Admin", "Editor", "User"],
      default: "User",
    },
    active: {
      type: Boolean,
      default: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
    trash: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// export model
module.exports = mongoose.model("user", userSchema);
