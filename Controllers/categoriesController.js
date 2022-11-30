const Category = require("../models/Category")

class Controller {

  //Get all the Categories
  getAll(req, res, next) {
    Category.aggregate(
      [
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "category_id",
            as: "items",
          },
        },
      ], (err, response) => {
        if (err) return res.status(500).json({
          message: `ERROR ${err}`,
          success: false,
        });
        res.status(200).json({ success: true, message: "Get Categories Successfully", data: response });
      });
  }

  //GetOne by id 
  getById(req, res, next) {
    let { id } = req.params;
    Category.aggregate(
      [
        {
          $match: {
              _id: mongoose.Types.ObjectId(id)
          },
        },
        {
          $lookup: {
            from: "items",
            localField: "_id",
            foreignField: "category_id",
            as: "items",
          },
        },
      ], (err, response) => {
      if (err) return res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
      res.status(200).json({ success: true, message: "Get Category Successfully", data: response });
    });
  }

  //Add a Category
  post(req, res, next) {
    let body = req.body;
    let doc = new Category(body);
    doc.save((err, response) => {
      if (err) return res.status(500).json({
        message: `ERROR ${err}`,
        success: false,
      });
      res.status(200).send({ success: true, message: "Category added Successfully", data: response });
    });
  }

  //Update a Category
  put(req, res, next) {
    let { id } = req.params;
    let body = req.body;
    Category.updateOne(
      { _id: id },
      {
        $set: body,
      },
      (err, response) => {
        if (err) return res.status(500).json({
          message: `ERROR ${err}`,
          success: false,
        });
        res.status(200).send({ success: true, message: "Category Updated Successfully", data: response });
      }
    );
  }
  //Delete a Category
  delete(req, res, next) {
    let { id } = req.params;
    Category.findByIdAndDelete({ _id: id }, (err, response) => {
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