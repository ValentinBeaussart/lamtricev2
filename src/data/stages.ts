import stagesImg from '../assets/images/stages.webp';
import franck from '../assets/images/franck.avif';

export const stages = {
  'yoga-restauratif': {
    title: "Stage de Yoga Restauratif",
    date: "15-16 Juillet 2024",
    image: stagesImg,
    description: "Un week-end pour se ressourcer et approfondir sa pratique du yoga restauratif. Découvrez les bienfaits de cette pratique douce et profonde.",
    details: "Ce stage est ouvert à tous les niveaux et vous permettra d'explorer les postures restauratives, la respiration consciente et la méditation.",
    duree: "2 jours",
    prix: "180€",
    places: "12 places",
    programme: [
      "Jour 1 - Matin : Introduction au yoga restauratif et principes fondamentaux",
      "Jour 1 - Après-midi : Pratique des postures de base et techniques de respiration",
      "Jour 2 - Matin : Approfondissement des postures et méditation guidée",
      "Jour 2 - Après-midi : Pratique complète et intégration des apprentissages"
    ],
    prerequis: "Aucun prérequis nécessaire. Ce stage est ouvert à tous les niveaux, débutants bienvenus.",
    materiel: "Tapis de yoga, coussin de méditation, couverture (possibilité de prêt sur place)",
    professeur: {
      nom: "Sarah Martin",
      image: franck,
      bio: "Professeure certifiée avec 10 ans d'expérience, spécialisée en yoga restauratif"
    }
  },
  'initiation-ashtanga': {
    title: "Initiation à l'Ashtanga",
    date: "24 Août 2024",
    image: stagesImg,
    description: "Une journée intensive pour découvrir les fondamentaux de l'Ashtanga Yoga, une pratique dynamique et structurée.",
    details: "Parfait pour les pratiquants réguliers souhaitant découvrir ou approfondir leur pratique de l'Ashtanga.",
    duree: "1 jour",
    prix: "95€",
    places: "10 places",
    programme: [
      "Matin : Introduction à l'Ashtanga et échauffements spécifiques",
      "Midi : Pause repas et discussion sur la philosophie du yoga",
      "Après-midi : Pratique guidée de la première série"
    ],
    prerequis: "Une pratique régulière du yoga est recommandée. Ce stage est de niveau intermédiaire.",
    materiel: "Tapis de yoga, serviette, tenue confortable",
    professeur: {
      nom: "Julie Bernard",
      image: franck,
      bio: "Professeure d'Ashtanga certifiée, formée à Mysore en Inde"
    }
  },
  'meditation-yoga': {
    title: "Week-end Méditation et Yoga",
    date: "21-22 Septembre 2024",
    image: stagesImg,
    description: "Un week-end immersif combinant pratiques de méditation et séances de yoga pour une expérience transformative.",
    details: "Au programme : méditation guidée, yoga doux, pranayama et ateliers sur la pleine conscience.",
    duree: "2 jours",
    prix: "200€",
    places: "12 places",
    programme: [
      "Jour 1 - Matin : Introduction à la méditation et pratiques de base",
      "Jour 1 - Après-midi : Yoga doux et techniques de respiration",
      "Jour 2 - Matin : Méditation guidée et pratique du silence",
      "Jour 2 - Après-midi : Intégration des pratiques et cercle de partage"
    ],
    prerequis: "Ouvert à tous les niveaux. Aucune expérience préalable requise.",
    materiel: "Tapis de yoga, coussin de méditation, carnet de notes",
    professeur: {
      nom: "Thomas Dubois",
      image: franck,
      bio: "Expert en méditation et yoga thérapeutique"
    }
  }
};

export type Stage = typeof stages[keyof typeof stages];