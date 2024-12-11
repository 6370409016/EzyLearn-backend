const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const dbConnection = require('./src/config/dbConnection');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorHandler');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const { googleAuthService, githubAuthServive } = require('./src/service/userAuthService')


dbConnection();


app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
    // cookie: {
    //     httpOnly: true,
    //     secure: true,
    //     sameSite: 'None',
    // }
}));

app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

googleAuthService();
githubAuthServive();

app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

app.use("/auth", require('./src/routes/socialAuthRoute'));

app.use('/api/users', require('./src/routes/userRoute'));
app.use('/api/courses', require('./src/routes/courseRoute'))
const port = process.env.PORT || 5000;




// app.use(errorHandler);
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})


