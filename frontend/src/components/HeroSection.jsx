import React from "react";

function HomePage() {
  return (
      
      <div className="flex flex-row">
        <div className="absolute top-0 left-0 h-full w-60 flex items-center justify-center overflow-hidden z-0">
          {/* Top Gradient Overlay */}
          <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-black to-transparent z-10"></div>
          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent z-10"></div>

          <div className="move-up-to-down">
            {/* Left Side Text */}
            <h1 className="text-[00px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] font-bold uppercase -rotate-90 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent ">
              EnergonEnergonEnergon
            </h1>
          </div>
        </div>

        <div className="absolute top-0 left-80 h-full w-0 xl:w-60 flex items-center justify-center overflow-hidden z-0">
          {/* Top Gradient Overlay */}
          <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-black to-transparent z-10"></div>
          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent z-10"></div>

          <div className="move-down-to-up ">
            {/* Right Side Text */}
            <h1 className="text-[00px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] font-bold uppercase rotate-90 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
              EnergonEnergonEnergon
            </h1>
          </div>
        </div>
        

        {/* Main content */}
        <div className="flex flex-col items-center justify-center pt-40 pb-8 px-4 w-full max-w-4xl z-10">
          {/* Hero image */}
          <div className="relative sm:w-[100px] sm:h-[100px] lg:w-[500px] lg:h-[500px] mb-8 rounded-full overflow-hidden">
            <img
              src="/logo.jpg"
              alt="Energon Orbital"
              className="object-cover w-full h-full"
            />
          </div>
          {/* Title with gradient */}
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-7xl font-bold bg-gradient-to-t from-white via-gray-300 to-transparent bg-clip-text text-transparent pb-4">
              Energon
            </h1>
            <p className="text-2xl text-gray-400">
              peer to peer energy trading
            </p>
          </div>
          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
            {[
              { icon: "⚡", title: "Energy trading" },
              { icon: "🌱", title: "Clean & Efficient" },
              { icon: "₿", title: "Decentralized" },
            ].map((card, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-blue-500/10 rounded-2xl blur-xl group-hover:bg-blue-500/20 transition-colors duration-300"></div>
                <div className="relative bg-black/40 backdrop-blur-md p-8 rounded-2xl border border-white/10 transition-transform duration-300 group-hover:scale-105">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="text-3xl">{card.icon}</div>
                    <h3 className="text-xl font-semibold">{card.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute top-0 right-80 h-full w-0 xl:w-60  flex items-center justify-center overflow-hidden z-0">
          {/* Top Gradient Overlay */}
          <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-black to-transparent z-10"></div>
          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent z-10"></div>

          <div className="move-down-to-up ">
            {/* Right Side Text */}
            <h1 className="text-[00px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] font-bold uppercase rotate-90 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent">
              EnergonEnergonEnergon
            </h1>
          </div>
        </div>

        <div className="absolute top-0 right-0 h-full w-60 flex items-center justify-center overflow-hidden z-0">
          {/* Top Gradient Overlay */}
          <div className="absolute top-0 h-1/3 w-full bg-gradient-to-b from-black to-transparent z-10"></div>
          {/* Bottom Gradient Overlay */}
          <div className="absolute bottom-0 h-1/3 w-full bg-gradient-to-t from-black to-transparent z-10"></div>

          <div className="move-up-to-down">
            {/* Left Side Text */}
            <h1 className="text-[00px] sm:text-[150px] md:text-[200px] lg:text-[250px] xl:text-[300px] font-bold uppercase -rotate-90 bg-gradient-to-b from-gray-800 via-gray-600 to-gray-800 bg-clip-text text-transparent ">
              EnergonEnergonEnergon
            </h1>
          </div>
        </div>
        
      </div>
  );
}

export default HomePage;
