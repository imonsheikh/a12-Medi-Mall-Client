// eslint-disable-next-line react/prop-types
const SectionHead = ({ top, text }) => {
  return (
    <div className=" text-center ">
      <p className="uppercase text-base lg:text-lg text-custom-custom">{top}</p>
      <h1 className=" uppercase text-3xl lg:text-4xl font-semibold">{text}</h1>
    </div>
  );
};

export default SectionHead;
