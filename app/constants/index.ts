export const API_URL = "https://virtual-sentinel-5db263dece23.herokuapp.com";

export const localCategories = [
  // puisque les catégories ne sont qu'un id et un titre au niveau du back-end, on peut définir le reste ici
  {
    id: 1,
    filterName: "Fondamentaux",
    description:
      "Apprenez les bases de la cybersécurité et protégez vos données",
    image: require("../assets/images/category_1.png"),
  },
  {
    id: 2,
    filterName: "Accès",
    description:
      "Apprenez à sécuriser et gérer efficacement les identités et les accès pour protéger les ressources de votre entreprise",
    image: require("../assets/images/category_2.png"),
  },
  {
    id: 3,
    filterName: "Données",
    description:
      "Maîtrisez les stratégies et les outils essentiels pour protéger et sécuriser les données sensibles de votre organisation.",
    image: require("../assets/images/category_3.png"),
  },
  {
    id: 4,
    filterName: "Réseaux",
    description:
      "Découvrez comment protéger et sécuriser les infrastructures réseau contre les menaces et les cyberattaques.",
    image: require("../assets/images/category_4.png"),
  },
];

export const localFormations = [
  {
    id: 1,
    isPro: false,
    image: "formation_1.jpg",
    videoId: "aYkiZLdpZmE",
  },
  {
    id: 2,
    isPro: false,
    image: "formation_2.jpg",
    videoId: "j87M-K6ZVBk",
  },
  {
    id: 3,
    isPro: false,
    image: "formation_3.jpg",
    videoId: "pWmgcJQ0Sno",
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

export const localChapters = [
  {
    id: 1,
    video: "aYkiZLdpZmE",
    title: "Introduction à la cybersécurité",
    contents: [
      {
        title: "La cybersécurité c'est quoi ?",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus",
      },
      {
        title: "Les enjeux",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus",
      },
    ],
  },
  {
    id: 2,
    video: "PXV2POvElps",
    title: "Menaces en cybersécurité",
    contents: [
      {
        title: "",
        text: "À l'aube de 2024, le paysage de la cybersécurité continue d'évoluer rapidement. Les cybermenaces deviennent de plus en plus sophistiquées, exigeant des stratégies de défense toujours plus robustes. Voici un aperçu des dix principales menaces de cybersécurité auxquelles les entreprises et les particuliers doivent se préparer cette année.",
      },
      {
        title: "Ransomwares",
        text: "Les cybercriminels paralysent les entreprises en chiffrant leurs données et en exigeant des rançons.",
      },
      {
        title: "Phishing",
        text: "Les attaques de phishing ciblent les informations sensibles des utilisateurs, les incitant à divulguer leurs données personnelles.",
      },
      {
        title: "Phishing",
        text: "Les attaques de phishing ciblent les informations sensibles des utilisateurs, les incitant à divulguer leurs données personnelles.",
      },
      {
        title: "Phishing",
        text: "Les attaques de phishing ciblent les informations sensibles des utilisateurs, les incitant à divulguer leurs données personnelles.",
      },
      {
        title: "Phishing",
        text: "Les attaques de phishing ciblent les informations sensibles des utilisateurs, les incitant à divulguer leurs données personnelles.",
      },
    ],
  },
  {
    id: 3,
    video: "aYkiZLdpZmE",
    title: "Outils de protection",
    contents: [
      {
        title: "Les outils de protection",
        text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut purus",
      },
    ],
  },
];
