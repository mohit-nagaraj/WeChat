export function spaceToPlus(str) {
    return str.replace(/ /g, "+");
}

export const getDay = (date) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1;
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
}

export const getHour = (date) => {
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}