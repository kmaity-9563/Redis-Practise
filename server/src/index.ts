import express from "express";
import { createClient } from "redis";
// import { json } from "stream/consumers";
// first server

const app = express();
app.use(express.json())

const client = createClient()
client.on("error" , (err) => {console.log("redis connection error", err)})

app.post("/submit" , async (req,res) => {
    const {porblemId , code , language} = req.body
    console.log(porblemId , code , language)
    try {
        await client.lPush("problems", JSON.stringify({porblemId , code , language}))
        res.status(200).send("submisssion recieved and done")
    } catch (error) {
        console.log("error during submit ", error)
        res.status(400).send("didn't recieved")
    }

} )

export async function StartServer(){
    try {
        
           await client.connect()
           console.log("redis connected")
    
           app.listen(3000 , () => {
            console.log("server running on 3000")
           })
    } catch (error) {
        console.log("error during starting server" ,  error)
    }
}

StartServer()

