const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");
const { Jobs, JobDetails } = require("./database-models/jobs");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3005 || process.env.PORT;

mongoose
  .connect(
    "mongodb+srv://ajayreddy6753:Ajay6753@ajayreddycluster.1x5u1ub.mongodb.net/jobbyApp?retryWrites=true&w=majority"
  )
  .then(() => console.log("DB Connected"))
  .catch((error) => console.log(error));

// const addJobs = async () => {
//   try {
//     const jobDetail = new JobDetails({
//       title: "Data Scientist",
//       companyLogoUrl:
//         "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
//       companyWebsiteUrl: "https://about.netflix.com/en",
//       rating: 4.2,
//       location: "Delhi",
//       packagePerAnnum: "22 LPA",
//       jobDescription:
//         "Data Scientists at Netflix are consultants who partner with our Content, Marketing, and Product teams. We help them tell incredible stories, develop world-class campaigns, and optimize the experience of using Netflix. You will work closely with the teams to understand their insights needs; then build and deliver best-in-class research to address them.",
//       employmentType: "Full Time",
//       skills: [
//         {
//           name: "R",
//           imageUrl:
//             "https://assets.ccbp.in/frontend/react-js/jobby-app/r-img.png",
//         },
//         {
//           name: "SQLite",
//           imageUrl:
//             "https://assets.ccbp.in/frontend/react-js/jobby-app/sqlite-img.png",
//         },
//         {
//           name: "Python",
//           imageUrl:
//             "https://assets.ccbp.in/frontend/react-js/jobby-app/python-img.png",
//         },
//         {
//           name: "Apache Spark",
//           imageUrl:
//             "https://assets.ccbp.in/frontend/react-js/jobby-app/apache-spark-img.png",
//         },
//       ],
//       lifeAtCompany: {
//         description:
//           "Our core philosophy is people over process. Our culture has been instrumental to our success. It has helped us attract and retain stunning colleagues, making work here more satisfying. Entertainment, like friendship, is a fundamental human need, and it changes how we feel and gives us common ground. We want to entertain the world.",
//         imageUrl:
//           "https://assets.ccbp.in/frontend/react-js/jobby-app/life-netflix-img.png",
//       },
//     });

//     const savedJobDetail = await jobDetail.save();
//     // Create and save a Job document that uses the same _id as the JobDetail

//     const job = new Jobs({
//       _id: savedJobDetail._id, // Use the same _id as the JobDetail
//       title: "Data Scientist",
//       companyLogoUrl:
//         "https://assets.ccbp.in/frontend/react-js/jobby-app/netflix-img.png",
//       rating: 4.2,
//       location: "Delhi",
//       packagePerAnnum: "22 LPA",
//       jobDescription:
//         "Data Scientists at Netflix are consultants who partner with our Content, Marketing, and Product teams. We help them tell incredible stories, develop world-class campaigns, and optimize the experience of using Netflix. You will work closely with the teams to understand their insights needs; then build and deliver best-in-class research to address them.",
//       employmentType: "Full Time",
//     });

//     await job.save();
//     await mongoose.disconnect();
//   } catch (e) {
//     console.log(e);
//   }
// };

// addJobs();

app.use("/auth", require("./routes/authRoutes"));
app.use("/api", require("./routes/apiRoutes"));

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
