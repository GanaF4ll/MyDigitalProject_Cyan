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
    image: require("../assets/images/mock3.jpg"),
    filterName: "Données",
  },
  {
    id: 4,
    description:
      "Découvrez comment protéger et sécuriser les infrastructures réseau contre les menaces et les cyberattaques.",
    image: require("../assets/images/mock1.jpg"),
    filterName: "Réseaux",
  },
];
