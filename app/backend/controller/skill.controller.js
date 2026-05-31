import Skills from "../model/skills.model.js";

export const Get = async (req, res) => {
  try {
    const skills = await Skills.find().sort({ index: 1 });
    if (!skills) return res.status(400).json({ message: "No skills Available!" });
    else return res.status(200).json({ skills });
  } catch (error) {
    console.log('error while getting skills me info => ', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Add = async (req, res) => {
  try {
    const { name, icon } = req.body;

    if (!name || !icon) return res.status(400).json({ message: "All Field Required!" });

    // Find the highest index and increment by 1
    const lastSkill = await Skills.findOne().sort({ index: -1 });
    const newIndex = lastSkill ? lastSkill.index + 1 : 0;

    await Skills.create({ name, icon, index: newIndex });

    return res.status(200).json({ message: "Skills Added Successfully!" });
  } catch (error) {
    console.log(`Error while Adding Skills\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Update = async (req, res) => {
  try {
    const { name, icon, _id } = req.body;

    if (!name || !icon || !_id) return res.status(400).json({ message: "All Field Required!" });

    const skill = await Skills.findById(_id);

    skill.name = name;
    skill.icon = icon;
    await skill.save();

    return res.status(200).json({ message: "Skill Updated Successfully!" });
  } catch (error) {
    console.log(`Error while Updating Skill\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Delete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) return res.status(400).json({ message: "Data not received in backend!" });

    const isDeleted = await Skills.findByIdAndDelete(id);

    if (!isDeleted) return res.status(400).json({ message: "Failed to delete skill" });

    return res.status(200).json({ message: "Skill Deleted Successfully!" });
  } catch (error) {
    console.log(`Error while Deleting Skills\nError => `, error.message);
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
    const skills = await Skills.find().sort({ index: 1 });

    if (!skills.length) {
      return res.status(400).json({ message: "No skills found!" });
    }

    const maxIndex = skills.length - 1;
    let targetIndex;

    if (direction === "next") {
      targetIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
    } else if (direction === "previous") {
      targetIndex = currentIndex - 1 < 0 ? maxIndex : currentIndex - 1;
    } else {
      return res.status(400).json({ message: "Invalid direction. Use 'next' or 'previous'." });
    }

    // Swap index values in the database
    const currentSkill = skills[currentIndex];
    const targetSkill = skills[targetIndex];

    // Temporarily set the current skill's index to -1 (to avoid duplicate key error)
    await Skills.findOneAndUpdate({ _id: currentSkill._id }, { $set: { index: -1 } });

    // Assign currentSkill's index to targetSkill
    await Skills.findOneAndUpdate({ _id: targetSkill._id }, { $set: { index: currentSkill.index } });

    // Assign targetSkill's index to currentSkill (which is now -1)
    await Skills.findOneAndUpdate({ _id: currentSkill._id }, { $set: { index: targetSkill.index } });

    return res.json({ message: "Skill sequence updated successfully!" });
  } catch (error) {
    console.log(`Error while Changing Sequence of Skills\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}
