import { FaCartArrowDown } from "react-icons/fa6";

// eslint-disable-next-line react/prop-types
const CommonButton = ({textSize}) => {
  return (
    <button className={`btn hover:text-white rounded-md bg-white text-custom-custom border-2 border-custom-custom hover:bg-custom-custom ${textSize} `}>
      Add Cart{" "}
      <span>
        <FaCartArrowDown />
      </span>{" "}
    </button>
  );
};

export default CommonButton;
