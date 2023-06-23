const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const expressLayouts = require("express-ejs-layouts");
const errorController = require("./controllers/error");

app.set("view engine", "ejs");
app.set("views", "views");
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/admin", adminRoutes.router);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`);
});