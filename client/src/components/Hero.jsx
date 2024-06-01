import heroImg from "../assets/hero.jpg";

const Hero = () => {
  return (
    <div className="max-w-[1100px] mx-auto mt-[30px] rounded-md overflow-hidden">
      <img src={heroImg} alt="Hero Image" />
    </div>
  );
};

export default Hero;
