import SectionHead from "../../../Component/SectionHead";

const Blogs = () => {
  return (
    <div className=" my-[70px]   lg:my-[130px] max-w-[1440px] mx-auto">
      <SectionHead
        top={`let's see`}
        text={"read our latest blogs"}
      ></SectionHead>
      <div className=" grid lg:grid-cols-3 px-4 md:grid-cols-2 grid-cols-1 gap-8 mt-[60px]">
        <div className="card card-compact rounded-none ">
          <figure>
            <img src="https://i.ibb.co/Fqxbmrz/blog-one-1.jpg" alt="Shoes" />
          </figure>
          <div className=" pt-5 space-y-4">
            <h2 className="card-title">
              Supplement element with text and image
            </h2>
            <p>
              Products and theicalories content by serving weig loss pill that
              focuses on only one element.
            </p>
            <div className="card-actions">
              <button
                className={`btn hover:text-white rounded-md bg-white text-custom-custom border-2 border-custom-custom hover:bg-custom-custom text-lg `}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
        <div className="card card-compact rounded-none ">
          <figure>
            <img src="https://themeim.com/demo/vaxin/demo-one/media/images/blog/blog-three.jpg" alt="Shoes" />
          </figure>
          <div className=" pt-5 space-y-4">
            <h2 className="card-title">
            Vaccine Development: From Research to Rollout
            </h2>
            <p>
            Vaccines save millions of lives each year. Explore the journey of vaccine development, the science behind.
            </p>
            <div className="card-actions">
              <button
                className={`btn hover:text-white rounded-md bg-white text-custom-custom border-2 border-custom-custom hover:bg-custom-custom text-lg `}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
        <div className="card card-compact rounded-none ">
          <figure>
            <img src="https://themeim.com/demo/vaxin/demo-one/media/images/blog/blog-two.jpg" alt="Shoes" />
          </figure>
          <div className=" pt-5 space-y-4">
            <h2 className="card-title">
            The Role of AI in Modern Medicine
            </h2>
            <p>
            Mental health awareness is more important than ever. Learn about the most common mental health conditions...
            </p>
            <div className="card-actions">
              <button
                className={`btn hover:text-white rounded-md bg-white text-custom-custom border-2 border-custom-custom hover:bg-custom-custom text-lg `}
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
