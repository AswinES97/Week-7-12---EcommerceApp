const { getSingleProduct } = require("../models/products.model");

module.exports = {
  getSingleProductPage: async (req, res) => {
    const pId = req.query.pId;
    const user = req.user;

    getSingleProduct(pId)
      .then((product) => {
        return res.render("singleproductpage", {
          product: product,
          userStatus: user?.loggedIn,
          userName: user?.name,
          userId: user?.userId,
          cartCount: user?.cartC,
          wishlistCount: user?.wishlistC,
          keyWord: false,
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({ err: "not able to get data" });
      });
  },
};
