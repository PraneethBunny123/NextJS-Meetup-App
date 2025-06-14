import { MongoClient } from "mongodb"

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body

        const username = process.env.MONGODB_USERNAME
        const password = process.env.MONGODB_PASSWORD
        const cluster = process.env.MONGODB_CLUSTER
        const dbName = process.env.MONGODB_DB
        const collectionName = process.env.MONGODB_COLLECTION

        const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

        const client = await MongoClient.connect(uri)
        const db = client.db()

        const meetupsCollection = db.collection(collectionName)

        const result = await meetupsCollection.insertOne(data)
        console.log(result)

        client.close()

        res.status(201).json({ message: 'Meetup inserted!' })
    }
}
