const express = require("express");

const jwtAuth = require("../middleware/jwtAuth");
const { Jobs, JobDetails } = require("../database-models/jobs");

const router = express.Router();

router.get("/", (request, response) => {
  response.send({ message: "API Success" });
  console.log("API Success");
});

router.get("/jobs", jwtAuth, async (request, response) => {
  try {
    const jobsResponse = await Jobs.find({});
    return response.status(200).json({ jobsList: jobsResponse });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/jobs/:id", jwtAuth, async (request, response) => {
  try {
    const { id } = request.params;

    const jobDetailsRes = await JobDetails.findOne({ _id: id });

    if (!jobDetailsRes) {
      return response.status(404).json({ message: "Job Not Found" });
    }

    const jobTitle = jobDetailsRes.title;

    const similarJobs = await Jobs.find({
      title: { $regex: jobTitle, $options: "i" },
      _id: { $ne: id },
    });

    return response
      .status(200)
      .json({ jobDetails: jobDetailsRes, similarJobs: similarJobs });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

router.get("/filterjobs", jwtAuth, async (request, response) => {
  try {
    const {
      employment_type = "",
      minimum_package = "",
      search = "",
    } = request.query;

    const queryObject = {};

    if (employment_type) {
      const employmentTypeArray = employment_type.split(",");
      queryObject.employmentType = {
        $in: employmentTypeArray.map((type) => new RegExp(type, "i")),
      };
    }

    if (minimum_package) {
      const minPackage = parseFloat(minimum_package.replace(/\D+/g, ""));
      if (!isNaN(minPackage)) {
        queryObject.packagePerAnnum = { $gte: minPackage };
      }
    }

    if (search) {
      queryObject.title = { $regex: search, $options: "i" };
    }

    const filteredJobs = await Jobs.find(queryObject);

    if (filteredJobs.length === 0) {
      return response.status(400).json({ message: "No Jobs Found" });
    }

    return response.status(200).json({ filteredJobs: filteredJobs });
  } catch (error) {
    console.log(error.message);
    return response.status(500).json({ message: error.message });
  }
});

module.exports = router;
