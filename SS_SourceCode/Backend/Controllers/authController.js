import Patient from '../Models/PatientModel.js'; 
import Hospital from '../Models/HospitalModel.js'; // Importing the Hospital model
import Doctor from '../Models/DoctorModel.js'; // Importing the Doctor model (same as hospital model)
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export const Register = async (req, res) => {
  const {
    email,
    name,
    password,
    confirmPassword,
    contactNo,
    nationality,
    dob,
    gender,
    bloodGroup,
    role, // patient or hospital
    dof, // Date of foundation (specific to hospital)
    type, // Type of hospital (Gov, Semi-Gov, Private)
    registration_no, // Registration number (specific to hospital)
  } = req.body;

  try {
    // Check if password and confirmPassword match
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match!" });
    }

    let user = null;

    // Check if the role is a Patient or a Hospital
    if (role === "patient") {
      // Check if patient already exists
      user = await Patient.findOne({ email });
    } else if (role === "hospital") {
      // Check if hospital already exists
      user = await Hospital.findOne({ email });
    }

    // If user exists, return error
    if (user) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashed_pass = await bcrypt.hash(password, salt);

    // Create the appropriate user based on the role
    if (role === "patient") {
      // Create a new patient
      user = new Patient({
        email,
        name,
        password: hashed_pass,
        contactNo,
        nationality,
        dob,
        gender,
        bloodGroup,
        appointments: [],
      });
    } else if (role === "hospital") {
      // Create a new hospital
      user = new Hospital({
        email,
        name,
        password: hashed_pass,
        contactNo,
        dof, // Date of foundation
        type, // Type of hospital
        registration_no, // Registration number
        role, // hospital role
      });
    }
    console.log(req.body)
    // Save the user to the database
    await user.save();

    res.status(200).json({ success: true, message: "User registered successfully!" });

  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
