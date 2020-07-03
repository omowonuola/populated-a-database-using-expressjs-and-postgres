const express = require("express");
const app = express();
const fishRoutes = require("./routes/fishes");
const morgan = require("morgan");





app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("tiny"));

app.use("/fishes", fishRoutes);

app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error)
});

if(app.get('env') === 'development'){
    app.use((error, req, res, next) => {
        res.status(error.status || 500);
        return res.json({
            message: error.message,
            error
        });
    });
}

app.listen(5000, () => {
    console.log("Getting started on port 5000");
});