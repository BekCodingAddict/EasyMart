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

  const product = new Product(null, title, imageURL, description, price);
  product.save();
  res.redirect("/");
};

const getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const productId = req.params.productId;
  Product.findById(productId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    console.log(product);
    res.render("admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: product,
    });
  });
};

const postEditProduct = (req, res, next) => {
  const productId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageURL = req.body.imageURL;
  const updatedDesc = req.body.description;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageURL,
    updatedDesc,
    updatedPrice
  );

  updatedProduct.save();
  res.redirect("/admin/products");
};

const deleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect("/admin/products");
};

const getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render("admin/products", {
      prods: products,
      pageTitle: "Admin Products",
      path: "/admin/products",
    });
  });
};
module.exports = {
  addProduct,
  postAddProduct,
  getProducts,
  getEditProduct,
  postEditProduct,
  deleteProduct,
};
