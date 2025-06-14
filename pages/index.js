import Head from "next/head";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

// const DUMMY_MEETUPS = [
//     {
//         id: 'm1',
//         title: 'First meetup',
//         image: 'https://www.usnews.com/object/image/00000195-0240-db6b-afd7-0a7a1da10000/new-main-image-machu-picchu-credit-getty-images.jpg?update-time=1739503747923&size=responsive970',
//         address: 'Egypt'
//     },
//     {
//         id: 'm2',
//         title: 'Second meetup',
//         image: 'https://www.usnews.com/object/image/00000195-0240-db6b-afd7-0a7a1da10000/new-main-image-machu-picchu-credit-getty-images.jpg?update-time=1739503747923&size=responsive970',
//         address: 'Giza'
//     }
// ]

export default function Home(props) {
    return (
        <>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse best meetup spots using our React Meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res

//     // Fetch data from API 

//     return {
//         props: {
//             meetups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    //Fetch data from API
    const username = process.env.MONGODB_USERNAME
    const password = process.env.MONGODB_PASSWORD
    const cluster = process.env.MONGODB_CLUSTER
    const dbName = process.env.MONGODB_DB
    const collectionName = process.env.MONGODB_COLLECTION

    const uri = `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbName}?retryWrites=true&w=majority`

    const client = await MongoClient.connect(uri)
    const db = client.db()

    const meetupsCollection = db.collection(collectionName)

    const meetupsFromDB = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetupsFromDB.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}