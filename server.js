import app from './app.js';
import config from './app/config/index.js';
import connectDB from './app/ConnectDB/connectDB.js';
import Routes from './app/routes/index.js'
import ApiError from './app/Error/api-error.js';

const PORT = config.app.port;

//connect to mongodb
connectDB();

//define API route in server
app.use("/api/", Routes);


//define error handle when don't have compatible route
app.use((req, res, next) => {
  return next(new ApiError(404, "Resource not found"));
});

// define error-handling middleware last, after other app.use() and routes calls
app.use((err, req, res, next) => {
  return res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});


//run server
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});