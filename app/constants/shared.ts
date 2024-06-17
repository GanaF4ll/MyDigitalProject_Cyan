export function minutesToHour(minutes: number): string {
  if (typeof minutes !== "number" || minutes < 0) {
    return "Veuillez entrer un nombre positif de minutes.";
  }

  const hours: number = Math.floor(minutes / 60);
  const remainingMinutes: number = minutes % 60;

  if (remainingMinutes === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h${remainingMinutes}`;
  }
}

export const notReady = () => {
  alert("Cette fonctionnalité n'est pas encore disponible.");
};
