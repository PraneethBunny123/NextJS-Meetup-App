import Head from "next/head"
import { MongoClient, ObjectId } from "mongodb"
import MeetupDetail from "../../components/meetups/MeetupDetail"

    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD
    const cluster = process.env.MONGODB_CLUSTER
    const dbName = process.env.MONGODB_DB
    const collectionName = process.env.MONGODB_COLLECTION

export default function MeetupDetails(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail 
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    )
}

export async function getStaticPaths() {

    const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

    const client = await MongoClient.connect(uri)
    const db = client.db()

    const meetupsCollection = db.collection(collectionName)

    const meetupIDs = await meetupsCollection.find({}, {_id: 1}).toArray()

    client.close()

    return {
        fallback: 'blocking',
        paths: meetupIDs.map(meetup => ({
            params: {meetupId: meetup._id.toString()}
        }))
    }
}

export async function getStaticProps(context) {
    //Fetching data for a single prop

    const meetupId = context.params.meetupId

    const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

    const client = await MongoClient.connect(uri)
    const db = client.db()

    const meetupsCollection = db.collection(collectionName)

    const selectedMeetup = await meetupsCollection.findOne({_id:new ObjectId(meetupId)})

    client.close()
    

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}