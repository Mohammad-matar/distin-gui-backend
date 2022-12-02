const Item = require("../models/Item")

class Controller {

  //Get all Items
  getAll(req, res, next) {
    Item.find((err, response) => {
      if (err) return res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
      res.status(200).json({ success: true, message: "Get Item Successfully", data: response });
    }).populate("category_id");
  }

  //GetOne by id 
  getById(req, res, next) {
    let { id } = req.params;
    Item.findOne({ _id: id }, (err, response) => {
      if (err)
        res.status(200).json({ success: true, message: "Get Item Successfully", data: response });
    });
  }

  //Add a Item
  post(req, res, next) {
    let { filename } = req.file || {};
    let { title, price, description, category_id } = req.body;
    let body = { title: title, price: price, description: description, category_id: category_id, img: filename };

    let doc = new Item(body);
    doc.save((err, response) => {
      if (err) return res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
      res.status(200).send({ success: true, message: "Item added Successfully", data: response });
    });
  }

  //Update a Item
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Item.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return res.status(500).json({
          message: `ERROR ${err}`,
          success: false,
        });
        res.status(200).send({ success: true, message: "Item Updated Successfully", data: response });
      }
    );
  }
  //Delete a Item
  delete(req, res, next) {
    let { id } = req.params;
    Item.findByIdAndDelete({ _id: id }, (err, response) => {
      if (err) return res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
      res.status(200).send({ success: true, message: "Deleted Successfully", data: response });
    });
  }
}

const controller = new Controller();
module.exports = controller;