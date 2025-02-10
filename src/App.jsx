import React from "react";
import SelectionDemo from "./components/orgchart";

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

const Homepage = () => {
  const [selectedMenu, setSelectedMenu] = React.useState("Line JP++");
  const [hide, setHide] = React.useState(false);

  const openSubMenu = (subMenu) => {
    if (selectedMenu === subMenu) {
      setHide(!hide);
      return;
    }
    setSelectedMenu(subMenu);
    setHide(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="p-6">
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
              className="w-72 border border-gray-300 rounded-lg overflow-hidden shadow-md"
            >
              <div className="w-full h-40 bg-gray-200 flex items-center justify-center">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold mb-1">{profile.name}</h3>
                <p className="text-gray-600">{profile.position}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 flex-wrap">
          {orgData.buttons.map((buttonText, index) => (
            <button
              key={index}
              className="min-w-[120px] px-6 py-2 border border-gray-900 bg-white rounded-md hover:bg-gray-100 transition"
              onClick={() => openSubMenu(buttonText)}
            >
              {buttonText}
            </button>
          ))}
        </div>
        {/* sub menu - hide on default */}
        {hide && (
          <div className="mt-3">
            <SelectionDemo />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
