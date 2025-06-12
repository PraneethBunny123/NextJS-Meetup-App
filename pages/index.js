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
    return {
        props: {
            meetups: DUMMY_MEETUPS
        },
        revalidate: 1
    }
}