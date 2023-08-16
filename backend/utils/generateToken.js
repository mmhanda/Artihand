import jwt from "jsonwebtoken";

const generateToken = (res, UserId) => {
  const token = jwt.sign({ UserId }, process.env.JWT_SECRET,
    { expiresIn: '100d' });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // don't use https on devmod
    sameSite: 'strict',
    maxAge: 100 * 24 * 60 * 60 * 1000, // to convert from days to millsecend 
  });
};

export default generateToken;