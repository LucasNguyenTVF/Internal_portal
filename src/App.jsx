import React, { useState } from "react";
import "./App.css";
import OrganizationChart from "./components/chart/OrganizationChart";
import Header from "./components/header/Header";
import Information from "./components/information/Information";


const data = [
  {
    expanded: true,
    type: "person",
    className: "bg-transparent",
    data: {
      image: "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
      name: "Amy Elsner",
      title: "Delivery Manager",
    },
    children: [
      {
        expanded: true,
        type: "person",
        className: "bg-transparent",
        data: {
          image: "https://primefaces.org/cdn/primereact/images/avatar/annafali.png",
          name: "Anna Fali",
          title: "CMO",
        },
        children: [
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Xu Xuefeng",
              title: "Marketing Manager",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/ivanmagalhaes.png",
              name: "Ivan Magalhaes",
              title: "Sales Manager",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
        ],
      },
      {
        expanded: true,
        type: "person",
        data: {
          image: "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
          name: "Stephen Shaw",
          title: "CTO",
        },
        children: [
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/stephenshaw.png",
              name: "Michael Zimmerman",
              title: "Architect",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
          {
            expanded: false,
            type: "person",
            data: {
              image: "https://primefaces.org/cdn/primereact/images/avatar/xuxuefeng.png",
              name: "Jane Doe",
              title: "Software Engineer",
            },
          },
        ],
      },
    ],
  },
]

const Homepage = () => {
  const [selectedMenu, setSelectedMenu] = useState("Line JP++");
  const [isShow, setIsShow] = React.useState(false);

  const openSubMenu = (subMenu) => {
    if (selectedMenu === subMenu) {
      setIsShow(!isShow);
      return;
    }
    setSelectedMenu(subMenu);
    setIsShow(true);
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen m-10 p-6">
        <Information openSubMenu={openSubMenu} />
        {isShow && (
          <OrganizationChart data={data} />
        )}
      </div>
    </div>
  );
};

export default Homepage;
