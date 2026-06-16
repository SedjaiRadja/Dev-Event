import ExploreBtn from "../components/ExploreBtn";
import EventCard from "../components/EventCard";
import Event from "../database/event.model";
import connectDB from "../lib/mongodb";
import { IEvent } from "../database/event.model";
type EventLean = Omit<IEvent, keyof Document> & {
  _id: string;
};
export default async function Page() {
  await connectDB();

  const events = await Event.find({})
    .sort({ createdAt: -1 })
    .lean();

  return (
    <section className="w-full">
      <h1 className="text-center">
        The Hub For Every Dev
        <br />
        Event You Cant Miss
      </h1>

      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div className="mt-20 w-screen relative left-1/2 -translate-x-1/2 px-5 sm:px-10">
        <h3 className="text-left mb-8">
          Discover a World of Dev Events
        </h3>

        <ul className="events">
          {events.map((event: EventLean) => (
            <li
              key={event._id.toString()}
              className="list-none"
            >
              <EventCard
                {...JSON.parse(JSON.stringify(event))}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}