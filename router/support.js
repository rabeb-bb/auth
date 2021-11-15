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
const isAuth = require("../middleware/isAuth");
const router = express.Router();

// router.get("/", (req, res) => {
//   res.send("test");
// }); =====>works
// *****************

//get book tickets
router.get("/book_tickets/:book_id", getTickets);
//get user tickets
// router.get("/user_tickets/:user_id", getUserTickets);
//delete ticket
router.get("/user/:_id", getTicketById);

//user
// Post ticket
router.post("/post", postTicket);
//update ticket
router.put("/user/update/:_id", ticketUpdate);
//delete ticket
// router.delete("/user/delete/:_id", ticketDelete);

//export
module.exports = router;
