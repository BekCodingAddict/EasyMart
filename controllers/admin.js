const Product = require("../models/product");

const addProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    editing: false,
  });
};

const postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageURL = req.body.imageURL;
  const price = req.body.price;
  const description = req.body.description;
  req.user
    .createProduct({
      title: title,
      price: price,
      imageURL: imageURL,
      description: description,
      userId: req.user.id,
    })
    .then((result) => {
      res.redirect("products");
      console.log("New Product created!");
    })
    .catch((err) => console.log(err));
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  req.user
    .getProducts({ where: { id: productId } })
    .then((products) => {
      const product = products[0];
      res.render("admin/edit-product", {
        pageTitle: "Edit Product",
        path: "/admin/edit-product",
        editing: editMode,
        product: product,
      });
    })
    .catch((err) => console.log(err));
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageURL;
  const updatedDesc = req.body.description;
  Product.findByPk(productId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageURL = updatedImageURL;
      product.description = updatedDesc;
      return product.save();
    })
    .then((result) => {
      console.log("Product has been updated!");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const deleteProduct = (req, res, next) => {
  const productId = req.body.productId;

  Product.findByPk(productId)
    .then((product) => {
      return product.destroy();
    })
    .then((result) => {
      console.log("Product has been deleted");
      res.redirect("/admin/products");
    })
    .catch((err) => console.log(err));
};

const getProducts = (req, res, next) => {
  req.user
    .getProducts()
    .then((products) => {
      res.render("admin/products", {
        prods: products,
        pageTitle: "Admin Products",
        path: "/admin/products",
      });
    })
    .catch((err) => console.log(err));
};
module.exports = {
  addProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
};
