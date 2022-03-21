import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient } from 'mongodb';

function MeetupDetails() {
    return (
        <MeetupDetail 
            image="https://d26toa8f6ahusa.cloudfront.net/wp-content/uploads/2020/11/17092527/iStock-1280526363.jpg"
            title="A first Meetup"
            address= 'Gaspe Road 5, 12345 Tokyo'
            description= "The very first meetup on this app!"
        />
    )
}

export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://Ren33000:s2!cUEzz4qk3p8r@cluster0.dpggy.mongodb.net/meetups?retryWrites=true&w=majority");
    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

    return {
        fallback: false ,
        paths: meetups.map(meetup => ({ params:{ meetupId: meetup._id.toString()}}))
        //  [
        //     { 
        //         params: {
        //             meetupId: 'm1',
        //         },
        //     },
        //     {
        //         params: {
        //             meetupId: 'm2',
        //         },
        //     },
        // ]
    }
}

export function getStaticProps(context) {
    // fetch data for a single meetup

    const meetupId = context.params.meetupId;
    console.log(meetupId);

    return {
        props: {
            meetupData: {
                image: 'https://thumbs.dreamstime.com/z/ikebukuro-shopping-street-tokyo-japan-november-people-shop-attokyo-city-district-night-capital-million-live-its-173860178.jpg',
                id: meetupId,
                title: 'First Meetup',
                address: 'Ikebukuro West gate Park',
                description: 'A modified version'
            }
        }
    }
}

export default MeetupDetails;