import { MongoClient } from "mongodb"

export default function handler(req, res) {
    if(req.method === 'POST') {
        const data = req.body

        const {title, image, address, description} = data

        MongoClient.connect('mongodb+srv://bunny:bunny@cluster0.xp1gj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    }
}