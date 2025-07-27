const colors = require("colors");
const Order = require("../models/order");
const Menu = require("../models/menu");
const { randomUUID } = require("crypto");

const guid = randomUUID();

exports.getOrderByOrderId = (req, res) => {
  var orderId = req.params.orderId;

  console.log("Get OrderById Called with Id; ", orderId);

  Order.findOne({ orderId: orderId })
    .then((response) => {
      res.status(200).json({
        data: response,
        links: { first: "", prev: "", self: "", next: "", last: "" },
        meta: null,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: "Something went wrong",
        message: error.message,
        timestamp: Date.now,
      });
    });
};

exports.getOrderByUserId = (req, res) => {
  var userId = req.params.userId;

  console.log("Get OrderById Called with Id; ", userId);

  Order.find({ userId: userId })
    .then((response) => {
      res.status(200).json({
        data: response,
        links: { first: "", prev: "", self: "", next: "", last: "" },
        meta: null,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: "Something went wrong",
        message: error.message,
        timestamp: Date.now,
      });
    });
};

exports.placeOrder = async (req, res) => {
  console.log("Place Order Called");

  // Check if order is valid
  if (req.body.items.length == 0) {
    return res.status(400).json({
      error: "Bad Request - Items can't be empty",
      message: error.message,
      timestamp: Date.now,
    });
  }

  // Get Prices from the official menu
  var menuPrices = await getPricesForOrder();
  var totalAmount = 0;

  // Calculate
  req.body.items.forEach((orderItem) => {
    var menuItem = menuPrices.find((matchItem) => {
      return matchItem.name === orderItem.name;
    });

    // Update request body
    orderItem["price"] = menuItem.price;

    // Update total
    totalAmount += menuItem.price;
  });

  // Update request
  req.body.orderId = guid;
  req.body.totalAmount = totalAmount;

  console.log("Final req body", req.body);

  Order.create({ ...req.body })
    .then((response) => {
      console.log("Order successfully deleted: ", response);

      res.status(200).json({
        data: `Order ${response.orderId} successfully deleted`,
        links: { first: "", prev: "", self: "", next: "", last: "" },
        meta: null,
      });
    })
    .catch((error) => {
      console.log("Something went wrong", error);
    });
};

exports.deleteOrder = (req, res) => {
  var orderId = req.params.orderId;

  console.log("Delete OrderById Called with Id; ", orderId);

  Order.findOneAndDelete({ orderId: orderId })
    .then((response) => {
      res.status(200).json({
        data: response,
        links: { first: "", prev: "", self: "", next: "", last: "" },
        meta: null,
      });
    })
    .catch((error) => {
      return res.status(500).json({
        error: "Something went wrong",
        message: error.message,
        timestamp: Date.now,
      });
    });
};

const getPricesForOrder = async () => {
  try {
    const menu = await Menu.find();
    console.log("getPricesForOrder: Menu found successfully");
    return menu;
  } catch (error) {
    console.log(`Error getMenu: ${error.message}`.red);
    throw new Error("getPricesForOrder: Failed to get menu");
  }
};
