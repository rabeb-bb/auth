const Ticket = require("../models/Ticket");

//Post a new review
exports.postTicket = async (req, res) => {
  try {
    //post a new Ticket
    const newTicket = new Ticket({ ...req.body });

    //save Ticket
    await newTicket.save();

    res
      .status(200)
      .send({ msg: "Ticket successfully posted", ticket: newTicket });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not post Ticket" }] });
  }
};
//update a Ticket
exports.ticketUpdate = async (req, res) => {
  try {
    //check if book already exists in the db or not
    const findTicket = await Ticket.updateOne(
      { _id: req.params._id },
      { $set: { ...req.body } }
    );

    res
      .status(200)
      .send({ msg: "Ticket successfully updated", ticket: findTicket });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not update Ticket" }] });
  }
};
//delete a book
exports.TicketDelete = async (req, res) => {
  try {
    //check if Ticket already exists in the db or not
    const deleteTicket = await Ticket.deleteOne({ _id: req.params._id });

    res
      .status(200)
      .send({ msg: "Ticket successfully deleted", Ticket: deleteTicket });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not delete Ticket" }] });
  }
};

//get a Ticket
exports.getTicketById = async (req, res) => {
  try {
    // const { _id } = req.body;
    //check if email exists in the db or not
    const findTicket = await Ticket.findById(req.params._id).populate(user_id);

    // if (!findTicket) {
    //   return res.status(404).send({ errors: [{ msg: "Ticket does not exist" }] });
    // }
    console.log(findTicket);
    res.status(200).send({ msg: "Ticket is found", Ticket: findTicket });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find book" }] });
  }
};
//get the Tickets of a certain book
exports.getTickets = async (req, res) => {
  try {
    const findTickets = await Ticket.find({
      book_id: req.params.book_id,
    }).populate("user_id");

    res
      .status(200)
      .send({ msg: " book Tickets are found", tickets: findTickets });
  } catch (error) {
    console.log(error);
    res.status(400).send({ errors: [{ msg: "could not find book Tickets" }] });
  }
};


