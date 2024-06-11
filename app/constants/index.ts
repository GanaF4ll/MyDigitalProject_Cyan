export const API_URL = "https://virtual-sentinel-5db263dece23.herokuapp.com";

export const localCategories = [
  // puisque les catégories ne sont qu'un id et un titre au niveau du back-end, on peut définir le reste ici
  {
    id: 1,
    description:
      "Apprenez les bases de la cybersécurité et protégez vos données",
    image: require("../assets/images/category_1.png"),
    filterName: "Fondamentaux",
  },
  {
    id: 2,
    description:
      "Apprenez à sécuriser et gérer efficacement les identités et les accès pour protéger les ressources de votre entreprise",
    image: require("../assets/images/category_2.png"),
    filterName: "Accès",
  },
  {
    id: 3,
    description:
      "Maîtrisez les stratégies et les outils essentiels pour protéger et sécuriser les données sensibles de votre organisation.",
    image: require("../assets/images/category_3.png"),
    filterName: "Données",
    image: require("../assets/images/mock3.jpg"),
  },
  {
    id: 4,
    description:
      "Découvrez comment protéger et sécuriser les infrastructures réseau contre les menaces et les cyberattaques.",
    image: require("../assets/images/category_4.png"),
    filterName: "Réseaux",
    image: require("../assets/images/mock1.jpg"),
  },
];

export const localFormations = [
  {
    id: 1,
    isPro: false,
    image: "formation_1.jpg",
  },
  {
    id: 2,
    isPro: false,
    image: "formation_2.jpg",
  },
  {
    id: 3,
    isPro: false,
    image: "formation_3.jpg",
  },
  {
    id: 4,
    isPro: false,
    image: "formation_4.jpg",
  },
  {
    id: 5,
    isPro: true,
    image: "formation_5.jpg",
  },
  {
    id: 6,
    isPro: true,
    image: "formation_6.jpg",
  },
];

