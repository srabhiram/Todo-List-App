import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <section className="justify-center  sm:flex gap-4 items-center">
      <Image alt="hero-png" src="/hero-png.jpg" width={600} height={300} />
      <div className="text-center">
        <h1 className="sm:text-9xl text-4xl font-bold">Todo-List</h1>
        <p className="sm:text-2xl text-xl my-1 mb-3">
          A Todo-List App built with Next.js
        </p>
        <Link
          href="/todos"
          className="bg-indigo-400 px-3 py-2 rounded-xl font-semibold cursor-pointer"
        >
          Get started
        </Link>
      </div>
    </section>
  );
};

export default Hero;
