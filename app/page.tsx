import ExploreBtn from "../components/ExploreBtn";
import { events } from "../lib/constants";
import EventCard from "../components/EventCard";
export default function Page() {
  return (
    <section className="w-full">
      <h1 className="text-center ">
        The Hub For Every Dev <br /> Event You Cant Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>
      <ExploreBtn />
      <div className="mt-20 w-screen relative left-1/2 -translate-x-1/2 px-5 sm:px-10">
        <h3 className="text-left mb-8">Discover a World of Dev Events </h3>
        <ul className="events">
          {events.map((event) => (
            <li key={event.slug} className="list-none">
              <EventCard {...event} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
