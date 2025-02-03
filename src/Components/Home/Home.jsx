import React from "react";
import Shape from "../../assets/img/shape.png";
import Bitcoin from "../../assets/img/Bitcoin.png";
const Home = () => {
  return (
    <div className="w-full relative bg-bgPrimary h-screen">
      <div className="absolute w-100 h-100 top-0 left-0">
        <img className="w-full" src={Shape} alt="" />
      </div>
      <div className="container mx-auto mt-20">
        <div className="grid grid-cols-12">
          <div className="col-span-7"></div>
          <div className="col-span-5">
            <img className="w-full" src={Bitcoin} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
