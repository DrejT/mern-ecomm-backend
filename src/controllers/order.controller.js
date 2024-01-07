const OrderModel = require("./../models/order.model");
// const UserModel = require("./../models/user.model");

async function orderCreate(req, res, next) {
  try {
    const order = new OrderModel({
      for: req.result.for,
      by: req.result.by,
      storeId: req.result.storeId,
      state: req.result.state,
      city: req.result.city,
      pincode: req.result.pincode,
      address1: req.result.address1,
      address2: req.result.address2,
    });
    if (!order) {
      return res.status(500).send("internal server error");
    }
    await order.save();
    res.status(200).send("order created successfully");
  } catch (error) {
    next(error);
  }
}

async function orderGet(req, res, next) {
  try {
    const orders = await OrderModel.find({ by: req.result }).populate("for");
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
}

async function getStoreOrders(req, res, next) {
  try {
    const orders = await OrderModel.find({ storeId: req.params.id });
    if (!orders) {
      return res.status(200).send("no orders found");
    }
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
}

async function getAllOrders(req, res, next) {
  try {
    const orders = await OrderModel.find({}).populate("by for");
    if (!orders) {
      return res.status(200).send("no orders found");
    }
    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  orderCreate,
  orderGet,
  getAllOrders,
  getStoreOrders,
};
