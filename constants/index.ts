import { BiShoppingBag } from "react-icons/bi";
import { BiHomeAlt2 } from "react-icons/bi";

export const PAGE_SIZE = 3;

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
    label: "Test",
    route: "/test",
    icon: BiShoppingBag,
  },
];

export const TEST_MERCHANDISE = [
  {
    image: "/assets/vase7.png",
    title: "Vase of void",
    description:
      "This vase is made by great clay master Gr'khul from the highest vilage in the east",
    price: 24.05,
    currencyType: "€",
    category: "pottery",
  },
  {
    image: "/assets/vase2.png",
    title: "Windmill vase",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 19.25,
    currencyType: "€",
    category: "pottery",
  },

  {
    image: "/assets/vase3.png",
    title: "Green pitcher",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 10.05,
    currencyType: "€",
    category: "pottery",
  },

  {
    image: "/assets/vase4.png",
    title: "Fluted",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 32.45,
    currencyType: "€",
    category: "Statues",
  },
  {
    image: "/assets/vase5.png",
    title: "Rerandom",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 32.45,
    currencyType: "€",
    category: "Statues",
  },
  {
    image: "/assets/vase6.png",
    title: "Puodus",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 32.45,
    currencyType: "€",
    category: "sculptures",
  },
  {
    image: "/assets/vase1.png",
    title: "Toungus",
    description:
      "Industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    price: 32.45,
    currencyType: "€",
    category: "pottery",
  },
];

export const SHOP_MENU = [
  {
    name: "pottery",
    count: 21,
  },
  {
    name: "Sculptures",
    count: 5,
  },
  {
    name: "Vessels",
    count: 17,
  },
  {
    name: "Garden Art",
    count: 3,
  },
  {
    name: "Custom Designs",
    count: 1,
  },
];
