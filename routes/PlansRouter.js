const express = require("express")
const router = express.Router()
const PlansController = require("../controllers/PlansControler")
const PlansControler = require("../controllers/PlansControler")

router.get("/admin/plans", PlansController.index)

router.get("/admin/plans/create", PlansController.create)

router.post("/plans/store", PlansController.store)

router.post("/plans/destroy", PlansController.destroy)

router.get("/admin/plans/edit/:id", PlansController.edit)

router.post("/plans/update", PlansController.update)

router.get("/admin/plans/deactiveted/:id/:type", PlansControler.deactiveted)

module.exports = router