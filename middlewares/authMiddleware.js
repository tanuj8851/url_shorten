import jwt from "jsonwebtoken";

//protected route token base
export const requireSignIn = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization || req.cookies.token;

    const decode = jwt.verify(authorization, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, route: "Not Protected", error: error.message });
  }
};
