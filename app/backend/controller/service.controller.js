import Service from "../model/service.model.js";

export const Get = async (req, res) => {
  try {
    const services = await Service.find().sort({ index: 1 });
    if (!services) return res.status(400).json({ message: "No Services Available!" });
    else return res.status(200).json({ services });
  } catch (error) {
    console.log('error while getting services me info => ', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Add = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "All Field Required!" });
    }

    // Find the highest index and increment by 1
    const lastService = await Service.findOne().sort({ index: -1 });
    const newIndex = lastService ? lastService.index + 1 : 0;

    await Service.create({ title, content, index: newIndex });
    return res.status(200).json({ message: "Service Added Successfully!" });
  } catch (error) {
    console.log(`Error while Adding Service\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Update = async (req, res) => {
  try {
    const { title, content, _id } = req.body;
    if (!title || !content || !_id) {
      return res.status(400).json({ message: "All Field Required!" });
    }

    const service = await Service.findById(_id);
    service.title = title;
    service.content = content;

    await service.save();
    return res.status(200).json({ message: "Service Updated Successfully!" });
  } catch (error) {
    console.log(`Error while Updating Service\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Delete = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "All Field Required!" });
    }

    const isDeleted = await Service.findByIdAndDelete(id);
    if (!isDeleted) {
      return res.status(400).json({ message: "Failed to delete service!" });
    }

    return res.status(200).json({ message: "Service Deleted Successfully!" });
  } catch (error) {
    console.log(`Error while Deleting Service\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}


export const ChangeSequence = async (req, res) => {
  try {
    const { currentIndex, direction } = req.body;

    if (currentIndex === undefined || direction === undefined) {
      return res.status(400).json({ message: "currentIndex or direction is missing!" });
    }

    // Fetch all skills sorted by index
    const services = await Service.find().sort({ index: 1 });

    if (!services.length) {
      return res.status(400).json({ message: "Services not found!" });
    }

    const maxIndex = services.length - 1;
    let targetIndex;

    if (direction === "next") {
      targetIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
    } else if (direction === "previous") {
      targetIndex = currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
    } else {
      return res.status(400).json({ message: "Invalid direction. Use 'next' or 'previous'." });
    }

    // Swap the elements in the array
    // Swap index values in the database
    const currentService = services[currentIndex];
    const targetService = services[targetIndex];

    // Temporarily set the current skill's index to -1 (to avoid duplicate key error)
    await Service.findOneAndUpdate({ _id: currentService._id }, { $set: { index: -1 } });

    // Assign currentService's index to targetService
    await Service.findOneAndUpdate({ _id: targetService._id }, { $set: { index: currentService.index } });

    // Assign targetService's index to currentService (which is now -1)
    await Service.findOneAndUpdate({ _id: currentService._id }, { $set: { index: targetService.index } });

    return res.json({ message: "Service sequence updated successfully!" });
  } catch (error) {
    console.log(`Error while Changing Sequence of Service\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

