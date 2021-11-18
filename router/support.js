const express = require("express");
const {
  postTicket,
  getUserTickets,
  getTickets,
  ticketUpdate,
  ticketDelete,
  getTicketById,
} = require("../controllers/support.controllers");
const {
  registerValidate,
  loginValidate,
  validation,
} = require("../middleware/validateUser");
const adminAuth = require("../middleware/adminAuth");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

//get tickets
router.get("/all", getTickets);
//get user tickets
// router.get("/user_tickets/:user_id", getUserTickets);
//delete ticket
// router.get("/user/:_id", adminAuth, getTicketById);

//user
// Post ticket
router.post("/post", postTicket);
//update ticket
router.put("/admin/update/:_id", adminAuth, ticketUpdate);
//delete ticket
// router.delete("/user/delete/:_id", ticketDelete);

//export
module.exports = router;
