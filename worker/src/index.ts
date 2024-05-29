import { createClient } from "redis";
const client = createClient()

// second server for workers
async function StartSubmission(submission :any) {
    const {porblemId , code , language} = JSON.parse(submission)
    console.log(`problem id ${porblemId}`)
    console.log(`code ${code}`)
    console.log(`language ${language}`)
}

export async function StartWorker(){
    try {
        await client.connect()
        console.log("redis connected")

       const submission = await client.brPop("problems", 0)
       console.log("submission",submission?.element)
        StartSubmission(submission?.element)
    } catch (error) {
        console.log("error in submission message", error)

        
    }

}

StartWorker()