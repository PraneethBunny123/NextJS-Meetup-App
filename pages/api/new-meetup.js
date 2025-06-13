import { MongoClient } from "mongodb"

export default async function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body

        const client = await MongoClient.connect('mongodb+srv://bunny:bunny@cluster0.xp1gj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
        const db = client.db()

        const meetupsCollection = db.collection('meetups')

        const result = await meetupsCollection.insertOne(data)
        console.log(result);

        client.close()
        
        res.status(201).json({message: 'Meetup inserted!'})
    }
}