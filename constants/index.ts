import { BiShoppingBag } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";

export const PAGE_SIZE = 5;

export const NAV_BAR_LINKS = [
  {
    label: "Home",
    route: "/",
    icon: BiHomeAlt2,
  },
  {
    label: "Shop",
    route: "/shop",
    icon: BiShoppingBag,
  },
  {
    label: "Admin",
    route: "/admin",
    icon: BiShoppingBag,
  },
];

export const ADMIN_MENU = [
  {
    label: "Dashboard",
    value: 0,
  },
  {
    label: "Shopboard",
    value: 0,
  },
  {
    label: "Account",
    value: 0,
  },
];

export const TEST_MERCHANDISE = [
  {
    title: "Owl vase",
    description:
      "This vase is made by great clay master Gr'khul from the highest vilage in the east",
    price: 24.05,
    category: "pottery",
  },
];

export const TEST_MERCHANDISE2 = [
  {
    id: "1",
    stock: 3,
    date: "2024/1/1",
    thumbnailImage: {
      url: "/assets/vase7.png",
      width: 1440,
      height: 1158,
    },
    images: [
      {
        url: "/assets/vase7.png",
        width: 1440,
        height: 1158,
      },
      {
        url: "/assets/owl.png",
        width: 1500,
        height: 1500,
      },
    ],
    title: "Owl vase",
    description:
      "This vase is made by great clay master Gr'khul from the highest vilage in the east",
    price: 24.05,
    currencyType: "€",
    category: "pottery",
  },
  {
    id: "2",
    stock: 1,
    date: "2024/1/1",
    thumbnailImage: {
      url: "/assets/vase2.png",
      width: 960,
      height: 1200,
    },
    images: [
      {
        url: "/assets/vase2.png",
        width: 960,
        height: 1200,
      },
    ],
    title: "Windmill vase",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 19.25,
    currencyType: "€",
    category: "pottery",
  },

  {
    id: "3",
    stock: 5,
    date: "2024/1/1",
    thumbnailImage: {
      url: "/assets/ceramics9.jpg",
      width: 512,
      height: 341,
    },
    images: [
      {
        url: "/assets/ceramics9.jpg",
        width: 512,
        height: 341,
      },
    ],
    title: "Onymy",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 10,
    currencyType: "€",
    category: "sculptures",
  },
];

// export const SHOP_MENU = [
//   {
//     name: "pottery",
//     count: 21,
//   },
//   {
//     name: "Sculptures",
//     count: 5,
//   },
//   {
//     name: "Vessels",
//     count: 17,
//   },
//   {
//     name: "Garden Art",
//     count: 3,
//   },
//   {
//     name: "Custom Designs",
//     count: 1,
//   },
// ];
