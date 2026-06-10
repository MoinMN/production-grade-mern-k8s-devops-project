import AboutMe from "../model/about.model.js";

export const Get = async (req, res) => {
  try {
    const about = await AboutMe.findOne();
    return res.status(200).json(about);
  } catch (error) {
    console.log('error while getting about me info =>\n', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Update = async (req, res) => {
  try {
    const { tagLineSkills, aboutMeContent } = req.body;
    await AboutMe.findOneAndUpdate(
      { singleton: true },  // ensure only single documents get updated
      { $set: { tagLineSkills, aboutMeContent } },
      { upsert: true, new: true }
    );

    return res.status(200).json({ message: "Data Updated Successfully!" });
  } catch (error) {
    console.log(`Error while verifing user\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

