import accountModels from "../models/account.js";
import bcrypt from "bcrypt";
import * as dotenv from "dotenv";
import handleToken from "../handleToken/handleToken.js";

dotenv.config();

class AuthController {
  register = async (req, res) => {
    try {
      const account = await accountModels.findOne({
        email: req.body.email,
      });

      if (account) {
        return res.status(400).json({ message: "account already exist" });
      } else {
        // Hash password
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        //const password = req.body.password;

        // Store data into DB
        const data = { ...req.body, password: hashPassword };
        const newAccount = new accountModels(data);
        await newAccount.save();

        // Return
        return res
          .status(200)
          .json({ message: "Register Successful", account: newAccount });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal server error", error });
    }
  };

  login = async (req, res) => {
    try {
      const account = await accountModels.findOne({
        email: req.body.email,
      });

      //account is registered
      if (account) {
        const mathPassword = await bcrypt.compare(
          req.body.password,
          account.password
        );

        //password true
        if (mathPassword) {
          const accessToken = handleToken.access({ _id: account._id }, "6000s");

          const refreshToken = handleToken.refresh(
            { _id: account._id },
            "6000s"
          );
          //store token to cookie
          res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            path: "/auth/refresh_token",
            maxAge: 30 * 24 * 60 * 60 * 1000,
          });

          //return data and accessToken
          return res.status(200).json({
            message: "Login succesful",
            account,
            accessToken,
          });
        } else {
          return res.status(403).json({ message: "Incorrect Password" });
        }
      } else {
        return res.status(400).json({ message: "Account doesn't exist" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message, error });
    }
  };

  logout = async (req, res) => {
    try {
      res.clearCookie("refreshToken");
      return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      return res.status(500).json({ message: error.message, error });
    }
  };

  refreshToken = (req, res) =>{
    res.send("This is refresh token api");
  }
}


export default new AuthController();
