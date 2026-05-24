"use client";
import Image from "next/image";

function ExploreBtn() {
  return (
    <button type="button" id="explore-btn" className="mt-7 mx-auto">
      <a href="#events">
        Explore Events
        <Image
          src="/arrow-down.svg"
          alt="Explore Events"
          width={24}
          height={24}
        />
      </a>
    </button>
  );
}
export default ExploreBtn;
