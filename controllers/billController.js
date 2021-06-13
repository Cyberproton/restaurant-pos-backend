const Bill = require("../models/Bill");

// Get all bills
const getBills = (req, res, next) => {
  Bill.find()
    .exec()
    .then((bills) => res.status(200).json({ bills: bills }))
    .catch((err) => res.status(500).json({ error: err }));
};

// Get bill by id
const getBill = (req, res, next) => {
  const id = req.params.billId;
  Bill.findById(id)
    .exec()
    .then((bill) => res.status(200).json({ bill: bill }))
    .catch((err) => res.status(500).json({ error: err }));
};

// Get bills issued by clerk id
const getBillsByEmployee = (req, res, next) => {
  const employeeId = req.params.employeeId;
  Bill.find({ employeeId: employeeId })
    .exec()
    .then((bills) => res.status(200).json({ bills: bills }))
    .catch((err) => res.status(500).json({ error: err }));
};

const addBill = (req, res, next) => {
  try {
    const bill = new Bill(req.body);
    bill
      .save()
      .then((bill) => res.status(200).json({ bill: bill }))
      .catch((err) => res.status(500).json({ error: err }));
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteBill = (req, res, next) => {
  //   console.log(req.params);
  const id = req.params.billId;
  //   console.log(id);
  Bill.findByIdAndRemove(id)
    .exec()
    .then((bill) => res.status(200).json({ bill: bill }))
    .catch((err) => res.status(500).json({ error: err }));
};

module.exports = {
  getBills: getBills,
  getBill: getBill,
  getBillsByEmployee: getBillsByEmployee,
  addBill: addBill,
  deleteBill: deleteBill,
};
