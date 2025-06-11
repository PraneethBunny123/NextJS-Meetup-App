import NewMeetupForm from "../../components/meetups/NewMeetupForm";

export default function NewMeetupPage() {

    function onAddMeetup(enteredMeetupData) {
        console.log(enteredMeetupData)
    }

    return (
        <>
            <div>new meetup</div>
            <NewMeetupForm onAddMeetup={onAddMeetup} />
        </>
    )
}