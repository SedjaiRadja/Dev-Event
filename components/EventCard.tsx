"use client";
import Link from "next/link";
import Image from "next/image";

interface Props {
  slug: string;
  image: string;
  title: string;
  location: string;
  date: string;
  time: string;
}
function EventCard({ title, location, date, time, slug, image }: Props) {
  return (
    <Link href={`/events/${slug}`} id="event-card">
      <Image
        src={image}
        alt={title}
        className="poster"
        width={410}
        height={300}
      />
      <div className="flex flex-row gap-2">
        <Image src="/pin.svg" alt="location" width={14} height={14} />
        <p>{location}</p>
      </div>
      <p className="title">{title}</p>
      <div className="datetime">
        <div>
          <Image src="/calendar.svg" alt="date" width={14} height={14} />
          <p>{date}</p>
        </div>
        <div>
          <Image src="/clock.svg" alt="time" width={14} height={14} />
          <p>{time}</p>
        </div>
      </div>
    </Link>
  );
}
export default EventCard;
