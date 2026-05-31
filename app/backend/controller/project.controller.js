import Project from "../model/project.model.js";
import cloudinary from "../config/Cloudinary.js";

export const Get = async (req, res) => {
  try {
    const projects = await Project.find().sort({ index: 1 });
    if (!projects) return res.status(400).json({ message: "No Projects Available!" });
    else return res.status(200).json({ projects });
  } catch (error) {
    console.log('error while getting projects info => ', error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Add = async (req, res) => {
  try {
    const { title, content, technology, githubLink, websiteLink, appLink, startDate, endDate } = req.body;
    const image = req.files?.image;

    if (!title || !content || !technology?.length || !githubLink || !image) {
      return res.status(400).json({ message: "Mandatory Fields Required!" });
    }

    // Find the last project and determine the new index
    const lastProject = await Project.findOne().sort({ index: -1 });
    const newIndex = lastProject ? lastProject.index + 1 : 0;

    // Convert buffer to base64
    const base64Image = `data:${image.mimetype};base64,${image.data.toString("base64")}`;

    // Upload to Cloudinary
    const imageSrc = await cloudinary.uploader.upload(base64Image, {
      folder: "portfolio/projects",
    });

    await Project.create({
      title,
      content,
      technology: technology.split(','),
      githubLink,
      websiteLink,
      appLink,
      startDate,
      endDate,
      image: imageSrc.secure_url,
      index: newIndex,
    });

    return res.status(200).json({ message: "Project Added Successfully!" });
  } catch (error) {
    console.log(`Error while Adding Project\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Update = async (req, res) => {
  try {
    const { title, content, technology, githubLink, websiteLink, appLink, startDate, endDate, _id } = req.body;
    const image = req.files?.image;

    if (!title || !content || !technology?.length || !githubLink) {
      return res.status(400).json({ message: "Mandatory Fields Required!" });
    }

    const project = await Project.findById(_id);
    if (!project) {
      return res.status(404).json({ message: "Project not found!" });
    }

    let imageUrl = project.image;
    if (image) {
      if (project.image) {
        const publicId = project.image.split("/").pop().split(".")[0];  // Extract public ID
        await cloudinary.uploader.destroy(`portfolio/projects/${publicId}`);
      }

      const base64Image = `data:${image.mimetype};base64,${image.data.toString("base64")}`;
      const result = await cloudinary.uploader.upload(base64Image, {
        folder: "portfolio/projects",
      });

      imageUrl = result.secure_url;
    }

    project.title = title;
    project.content = content;
    project.technology = technology.split(',');
    project.githubLink = githubLink;
    project.websiteLink = websiteLink;
    project.appLink = appLink;
    project.startDate = startDate;
    project.endDate = endDate;
    project.image = imageUrl;
    await project.save();

    return res.status(200).json({ message: "Project Updated Successfully!" });
  } catch (error) {
    console.log(`Error while Updating Project\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}

export const Delete = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "ID didn't received!" });
    }

    const project = await Project.findById(id);

    // delete image
    if (project.image) {
      const publicId = project.image.split("/").pop().split(".")[0];  // Extract public ID
      await cloudinary.uploader.destroy(`portfolio/projects/${publicId}`);
    }

    const isDeleted = await Project.findByIdAndDelete(id);

    if (!isDeleted) {
      return res.status(400).json({ message: 'Failed to delete project!' });
    }

    return res.status(200).json({ message: "Project Deleted Successfully!" });
  } catch (error) {
    console.log(`Error while Deleting Project\nError => `, error.message);
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
    const projects = await Project.find().sort({ index: 1 });

    if (!projects.length) {
      return res.status(400).json({ message: "Projects not found!" });
    }

    const maxIndex = projects.length - 1;
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
    const currentProject = projects[currentIndex];
    const targetProject = projects[targetIndex];

    // Temporarily set the current skill's index to -1 (to avoid duplicate key error)
    await Project.findOneAndUpdate({ _id: currentProject._id }, { $set: { index: -1 } });

    // Assign currentProject's index to targetProject
    await Project.findOneAndUpdate({ _id: targetProject._id }, { $set: { index: currentProject.index } });

    // Assign targetProject's index to currentProject (which is now -1)
    await Project.findOneAndUpdate({ _id: currentProject._id }, { $set: { index: targetProject.index } });

    return res.json({ message: "Project sequence updated successfully!" });
  } catch (error) {
    console.log(`Error while Changing Sequence of Projects\nError => `, error.message);
    return res.status(500).json({ message: "Internal Server Error!", error: error.message });
  }
}