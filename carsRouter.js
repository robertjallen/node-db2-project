const express = require('express');
const router = express.Router();
const db = require("./data/dbConfig");


//====================
//      CREATE
//====================
router.post("/", async (req, res, next) => {
  try {
    const payload = {
      VIN: req.body.VIN,
      make: req.body.make,
      model: req.body.model,
      milage: req.body.model,
      transmissionType: req.body.transmissionType,
      titlestatus: req.body.titlestatus,
    };
    const [newAccount] = await db.insert(payload).into("cars")
		// calling `.first()` is doing the same thing as `.limit(1)` and destructuring the result
    const message = await db.first("*").from("cars").where("id", newAccount)
    res.status(201).json(message)
  } catch (err) {
    next(err)
  }
})



//====================
//      READ
//====================
router.get("/", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "cars";`
		const cars = await db.select("*").from("cars")

		res.json(cars)
	} catch (err) {
		next(err)
	}
})

// GET BY ID

router.get("/:id", async (req, res, next) => {
	try {
		// translates to `SELECT * FROM "messages" WHERE "id" = ? LIMIT 1;`
		// descructure the result since we only care about the first index of the array
		const [account] = await db
			.select("*")
			.from("cars")
			.where("id", req.params.id)
			// make sure we're only getting a single result,
			// since we're destructuring the array above
			.limit(1)

		res.json(account)
	} catch (err) {
		next(err)
	}
})
//====================
//      UPDATE
//====================
router.put("/:id", async (req, res, next) => {
	try {
		const payload = {
      VIN: req.body.VIN,
      make: req.body.make,
      model: req.body.model,
      milage: req.body.model,
      transmissionType: req.body.transmissionType,
      titlestatus: req.body.titlestatus,
    };

		// translates to `UPDATE "messages" SET ? = ? WHERE "id" = ?;`
		await db("cars").update(payload).where("id", req.params.id)
		const message = await db.first("*").from("cars").where("id", req.params.id)

		res.json(message)
	} catch (err) {
		next(err)
	}
})

//====================
//      DELETE
//====================
router.delete("/:id", async (req, res, next) => {
	try {
		// translates to `DELETE FROM "messages" WHERE "id" = ?;`
		await db("cars").where("id", req.params.id).del()
		// since we no longer have a resource to return,
		// just send a 204 which means "success, but no response data is being sent back"
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})



module.exports = router;