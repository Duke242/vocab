import Image from "next/image"
import ButtonSignin from "./ButtonSignin"
import image from "@/app/frames.png"

const Hero = () => {
  return (
    <section className="max-w-7xl mx-auto bg-base-100 flex flex-col lg:flex-col items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 bg-[#87D8F5] pb-4">
          Spot a new word? Learn now. Get smarter.
        </h1>
        <p className="text-2xl text-gray-500">
          Discover new words? Scribble them down. Remember. Repeat.
        </p>
      </div>
      <ButtonSignin extraStyle="btn btn-wide bg-[#87D8F5] hover:bg-[#2fbbee] mx-auto" />
      <div className="w- h-1/2 relative hidden md:block bg-base-100 rounded-lg">
        {/* <div className="absolute inset-0 bg-[#87D8F5] filter blur-3xl opacity-50 rounded-lg"></div> */}
        <Image
          src={image}
          alt="Decorative background"
          className="w-full h-full z-50 hidden md:block"
        />
      </div>
    </section>
  )
}

export default Hero
