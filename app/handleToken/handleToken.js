import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

class Token {
   access(payload, expires) {
      return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: expires });
   }

   refresh(payload, expires) {
      return jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
         expiresIn: expires,
      });
   }
   checkRefreshToken(req, res, next) {
      const refreshToken = req.cookies?.refreshToken;
      if (refreshToken) {
         jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY, (err, user) => {
            if (err) {
               return res.status(403).json({ message: err });
            }
            req.user = user;
            next();
         });
      } else {
         return res.status(401).json("You don't have authetication for access");
      }
   }
   async verifyToken(req, res, next) {
      try {
         let token = req.headers.token;
         if (token) {
            token = token.split(' ')[1];
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
               if (err) {
                  return res.status(403).json({ message: err.message });
               }
               req.user = user;
               next();
            });
         } else {
            return res.status(401).json({ message: "You don't have authetication for access" });
         }
      } catch (error) {
         return res.status(500).json({ message: error.message });
      }
   }
}

export default new Token();