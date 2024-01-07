const StoreModel = require("./../models/store.model");
const UserModel = require("./../models/user.model");
const createError = require("http-errors");

async function getStore(req, res, next) {
  try {
    console.log(req.result);
    const store = await StoreModel.findById(req.result);
    if (!store) {
      return res.status(404).send("store does not exist");
    }
    res.send(store);
  } catch (error) {
    next(error);
  }
}

async function getAllAdminStore(req, res, next) {
  try {
    const storesList = await StoreModel.find({ owner: req.session.user.id });
    if (!storesList) {
      return res.status(404).send("no stores found");
    }
    res.status(200).send(storesList);
  } catch (error) {
    next(error);
  }
}

async function getAllUserStore(req, res, next) {
  try {
    const storesList = await StoreModel.find({}).populate("items");
    if (!storesList) {
      return res.status(404).send("no stores found");
    }
    res.status(200).send(storesList);
  } catch (error) {
    next(error);
  }
}

async function getUserStore(req, res, next) {
  try {
    console.log(req.params.slug);
    const store = await StoreModel.findOne({
      slug: req.params.slug,
    }).populate("items");
    if (!store) {
      return res.status(404).send("no stores found");
    }
    res.status(200).send(store);
  } catch (error) {
    next(error);
  }
}

async function createStore(req, res, next) {
  try {
    const newUser = await UserModel.findById(req.session.user.id);
    if (!newUser) {
      return res.status(401).send("unauth");
    }
    const store = new StoreModel({
      name: req.result.name,
      owner: req.session.user.id,
      businessEmail: req.result.businessEmail,
      description: req.result.description,
    });
    const newStore = await store.save();
    req.session.user.stores.push(newStore._id);
    newUser.stores.push(newStore);
    await newUser.save();
    res.status(200).send(newStore);
  } catch (error) {
    next(error);
  }
}

async function editStore(req, res, next) {
  try {
    const store = await StoreModel.findOneAndUpdate(
      { slug: req.params.slug },
      req.result,
      { new: true }
    );
    if (!store) {
      console.error("Store not found for update");
      return res.status(404).send({ error: "Store not found for update" });
    }
    await store.save();
    res.status(200).send(store);
  } catch (error) {
    next(error);
  }
}

async function deleteStore(req, res, next) {
  try {
    const store = await StoreModel.deleteOne({ slug: req.params.slug });
    if (!store) {
      return res.status(404).send("store not found");
    }

    res.status(200).send(store);
  } catch (error) {
    next(error);
  }
}
module.exports = {
  getStore,
  getAllAdminStore,
  getUserStore,
  getAllUserStore,
  createStore,
  editStore,
  deleteStore,
};
