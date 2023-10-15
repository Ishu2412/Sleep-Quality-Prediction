import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import {dirname} from "path";
import {fileURLToPath} from "url";

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
const port = process.env.PORT || 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static("public"))
app.set("view engine", "ejs")

app.get("/", (req, res) =>{
    res.sendFile(__dirname + "/index.html")
})


app.post("/quality", async (req, res) => {
    try{
        let data = {
            gender: req.body.gender,
            age: Number(req.body.age),
            occupation: req.body.occupation,
            sleep_duration: Number(req.body.sleep),
            physical_activity_level: Number(req.body.physical),
            bmi_category: req.body.bmi,
            heart_rate: Number(req.body.heart),
            daily_steps: Number(req.body.daily),
            sleep_disorder: req.body.sleepD
        }
        const response = await axios.post("https://sleep-quality-model.onrender.com/predict", data);
        console.log(response.data);
        res.render("answer.ejs", {sleepQuality: response.data.prediction})
    }catch(error){
        console.error(`Failed to make request : ${error.message}`);
        res.status(500).send(`Failed to fetch activity. Please try again`);
    }
})


app.listen(port, (req, res) =>{
    console.log(`Server is running on port ${port}`)
})

