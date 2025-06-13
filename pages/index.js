import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'First meetup',
        image: 'https://www.usnews.com/object/image/00000195-0240-db6b-afd7-0a7a1da10000/new-main-image-machu-picchu-credit-getty-images.jpg?update-time=1739503747923&size=responsive970',
        address: 'Egypt'
    },
    {
        id: 'm2',
        title: 'Second meetup',
        image: 'https://www.usnews.com/object/image/00000195-0240-db6b-afd7-0a7a1da10000/new-main-image-machu-picchu-credit-getty-images.jpg?update-time=1739503747923&size=responsive970',
        address: 'Giza'
    }
]

export default function Home(props) {
    return (
        <MeetupList meetups={props.meetups} />
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
    const client = await MongoClient.connect('mongodb+srv://bunny:bunny@cluster0.xp1gj.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0')
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetupsFromDB = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetupsFromDB
        },
        revalidate: 1
    }
}