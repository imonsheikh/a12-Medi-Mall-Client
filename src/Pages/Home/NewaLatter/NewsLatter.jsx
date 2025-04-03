const NewsLatter = () => {
  return (
    <div className=" flex flex-wrap border-2 lg:mb-[-50px] mt-20 z-10 rounded-2xl p-5 px-10  max-w-[1140px] mx-auto justify-between items-center">
      <div className=" bg-top bg-cover space-y-3" style={{backgroundImage: 'url(https://i.ibb.co/zbP9VGc/bg-newsletter.png)'}}>
        <h1 className=" text-2xl font-semibold">Subscribe to our Newsletter</h1>
        <div className="join w-full">
          <input
            className="input input-bordered join-item"
            placeholder="Email"
          />
          <button className="btn join-item rounded-r-full bg-custom-custom text-white">Subscribe</button>
        </div>
      </div>
      <div>
        <img src="https://i.ibb.co/YXyS2bB/bg-newsletter1-removebg-preview.png" alt="" />
      </div>
      <div className=" space-y-2">
        <h1 className=" text-2xl font-bold">Follow Us By</h1>
        <h2 className=" text-blue-400 text-5xl">01300315569</h2>
        <p className=" text-lg text-custom-custom font-semibold ">Leave a message!</p>
      </div>
    </div>
  );
};

export default NewsLatter;
