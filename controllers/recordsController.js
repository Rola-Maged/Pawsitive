// Create a new record
exports.createRecord = async(req,res)=>{
    const { date, status, verificationNumber, vet, user } = req.body;
    const newRecords = new booking({
        date,
        status,
        verificationNumber,
        vet,
        user,
         
    });
  
      await newRecords.save();

      res.json(newRecords)

}


// Get all records
exports.getBookings = async (req, res) => {
    try {
        const bookings = await booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a record by ID
exports.getAllRecord = async (req, res) => {
    try {
        const singleRecord = await booking.findById(req.params.id);
        if (!singleRecord) return res.status(404).json({ message: "bookikng not found" });
        res.status(200).json(singleRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a record
exports.updateRecord = async (req, res) => {
    const { date, status, verificationNumber, vet, user } = req.body;
    try {
        const updatedRecord = await booking.findByIdAndUpdate(
            req.params.id,
            { date, status, verificationNumber, vet, user },
            { new: true }
        );
        if (!updatedRecord) return res.status(404).json({ message: "booking not found" });
        res.status(200).json(updatedRecord);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a record
exports.deleteRecord = async (req, res) => {
    try {
        const deletedRecord = await booking.findByIdAndDelete(req.params.id);
        if (!deletedRecord) return res.status(404).json({ message: "booking not found" });
        res.status(200).json({ message: "booking deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};