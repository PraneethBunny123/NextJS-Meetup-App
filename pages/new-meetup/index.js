import Head from "next/head";
import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {

    const router = useRouter()

    async function onAddMeetup(enteredMeetupData) {
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(enteredMeetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json()
        
        console.log(data);
        
        router.push('/')
    }

    return (
        <>
            <Head>
                <title>Add New Meetuo</title>
                <meta name="description" content="Add your amazing Meetups to our React Meetups" />
            </Head>
            <NewMeetupForm onAddMeetup={onAddMeetup} />
        </>
    )
}