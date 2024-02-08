import express from "express";
import ServerlessHttp from "serverless-http";
import { static as expressStatic } from "express";
import bodyParser from "body-parser";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import path from "path";
const app = express();
app.use(expressStatic(path.join(process.cwd(),".." ,"dist")));
app.use(expressStatic(path.join(process.cwd(),".." , "public")));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), ".." ,"dist", "index.html"));
});

app.post("/", async (req, res) => {
  const fName = req.body.fName;
  const lName = req.body.lName;
  const email = req.body.email;

  const memberData = {
    email_address: email,
    status: "subscribed",
    merge_fields: {
      FNAME: fName,
      LNAME: lName,
    },
  };

  try {
    await addDoc(collection(db, "members"), { memberData });
    res.sendFile(path.join(process.cwd(), "dist", "..", "success.html"));
  } catch (error) {
    console.error("Error writing document: ", error);
    res.sendFile(path.join(process.cwd(),"..", "dist", "failure.html"));
  }
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is running on port 3000.");
});


export const handler = ServerlessHttp(app);