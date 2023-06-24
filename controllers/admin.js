const Product = require("../models/product");

const getAddProduct = (req, res, next) => {
    res.render("admin/edit-product", {
        layout: "layouts/main-layout",
        pageTitle: "Add Product Page",
        path: "add-product",
        editing: false,
    });
};

const postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect("/");
};

const getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect("/");
    }
    const id = req.params.id;
    Product.findById(id, (product) => {
        if (!product) {
            return res.redirect("/");
        }
        res.render("admin/edit-product", {
            layout: "layouts/main-layout",
            pageTitle: "Edit Product Page",
            path: "edit-product",
            editing: editMode,
            product: product,
        });
    });
};

const getProducts = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render("admin/products", {
            layout: "layouts/main-layout",
            pageTitle: "Admin Products Page",
            product: products,
            path: "/admin/products",
        });
    });
};

module.exports = { getAddProduct, postAddProduct, getProducts, getEditProduct };
