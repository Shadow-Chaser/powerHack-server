const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Bill = require('../models/Bill');

// Post a bill
router.post("/add-billing", (req, res) => {
    const newBill = new Bill(req.body);
    // console.log(newBill);
    newBill.save((err, data) => {
        if (err) {
            res.status(500).json({
                error: err,
            });
        } else {
            // console.log(data._id);
            res.status(200).json({
                id: data._id,
                message: "Bill inserted!",
            });
        }
    });
});

// Get all bill
router.get("/billing-list", async (req, res) => {
    try {
        const data = await Bill.find({});
        res.status(200).json({
            data
        });
    }
    catch (err) {
        res.status(500).json({
            error: "There was a server side error!",
        });
    }

});



// Put or update a Bill by id
/*
To DO
1. Fix schema validation bug in updating a doc 
*/
router.put("/update-billing/:id", (req, res) => {
    const newBill = new Bill(req.body);
    Bill.findByIdAndUpdate(
        { _id: req.params.id },
        {
            $set: {
                fullName: newBill.fullName,
                email: newBill.email,
                phone: newBill.phone,
                paidAmount: newBill.paidAmount
            },
        },
        (err) => {
            if (err) {
                res.status(500).json({
                    error: "There was a server side error!",
                });
            } else {
                res.status(200).json({
                    message: "Bill updated !",
                });
            }
        }
    );
});


// Delete a Bill by ID
router.delete("/delete-billing/:id", (req, res) => {
    console.log(req.params.id);
    Bill.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.status(500).json({
                error: "There was a server side error!",
            });
        } else {
            res.status(200).json({
                message: "Bill deleted !",
            });
        }
    });
});


module.exports = router;