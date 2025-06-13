import { MongoClient } from "mongodb"
import MeetupDetail from "../../components/meetups/MeetupDetail"

export default function MeetupDetails() {
    return (
        <MeetupDetail 
            image="https://www.usnews.com/object/image/00000195-0240-db6b-afd7-0a7a1da10000/new-main-image-machu-picchu-credit-getty-images.jpg?update-time=1739503747923&size=responsive970"
            title="pyramid"
            address="Paris"
            description="Niggas in paris"
        />
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://bunny:bunny@cluster0.xp1gj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetupIDs = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close()

    return {
        fallback: false,
        paths: [
            {
                params: {
                    meetupId: 'm1'
                }
            },
            {
                params: {
                    meetupId: 'm2'
                }
            },
        ]
    }
}

export async function getStaticProps(context) {
    //Fetching data for a single prop

    const meetupId = context.params.meetupId
    console.log(meetupId);
    

    return {
        props: {
            meetupData: {
                image: "https://www.usnews.com/object/image/00000195-0240-db6b-afd7-0a7a1da10000/new-main-image-machu-picchu-credit-getty-images.jpg?update-time=1739503747923&size=responsive970",
                id: meetupId,
                title: "pyramid",
                address: "Paris",
                description: "Niggas in paris"
            }
        }
    }
}