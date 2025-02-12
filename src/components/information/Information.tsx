import React, { memo } from "react";
const orgData = {
  profiles: [
    {
      name: "Aaron Lai",
      position: "Managing Director",
      image:
        "https://plus.unsplash.com/premium_photo-1681433426886-3d6d17f79d53?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Rainy Nguyen",
      position: "Delivery Managing",
      image:
        "https://plus.unsplash.com/premium_photo-1681433426886-3d6d17f79d53?q=80&w=2029&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ],
  buttons: ["Line JP++", "Line Global", "PQA", "BOD"],
  subMenu: {
    "Line JP++": ["Lucas Nguyen", "Lucas Nguyen", "Lucas Nguyen"],
    "Line Global": ["Lucas Thai", "Lucas Thai", "Lucas Thai"],
    PQA: ["Harry Trinh", "Harry Trinh", "Harry Trinh"],
    BOD: ["Maily Nguyen", "Maily Nguyen", "Maily Nguyen"],
  },
};
const Information = ({ openSubMenu }) => {
  return (
    <div>
      <div className="flex justify-center gap-4 mb-10">
        <div className="bg-gray-700 text-white px-4 py-2 rounded-md">
          Man-months: xx
        </div>
        <div className="bg-gray-700 text-white px-4 py-2 rounded-md">
          Total Members: xx
        </div>
      </div>
      <div className="flex justify-center gap-6 flex-wrap mb-10">
        {orgData.profiles.map((profile, index) => (
          <div
            key={index}
            className="w-56 border border-gray-300 rounded-lg overflow-hidden shadow-md"
          >
            <div className="bg-gray-200 items-center justify-center">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 text-center">
              <h3 className="text-sm font-semibold mb-1">{profile.name}</h3>
              <p className="text-gray-600">{profile.position}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center gap-4 flex-wrap">
        {orgData.buttons.map((buttonText, index) => (
          <button
            key={index}
            className="min-w-[120px] px-6 py-2  rounded-md transition duration-300 ease-in-out bg-[linear-gradient(90deg,_#0062BA_0%,_#009BDE_100%)] transform hover:scale-110"
            onClick={() => openSubMenu(buttonText)}
          >
            <span className="text-white">{buttonText}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default memo(Information);
