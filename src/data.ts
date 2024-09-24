type DateObject = {
    start: string,
    end: string,
    nb: number
};

const DATES = new Map<string, DateObject>([
    ['FANTA', {
        start: '2024-08-14T10:00:00.000+02:00',
        end: '2024-09-30T23:59:59.999+02:00',
        nb: 230
    }],
    ['MARVEL', {
        start: '2024-09-02T10:00:00.000+02:00',
        end: '2024-10-31T23:59:59.999+02:00',
        nb: 230
    }],
]);

function getDateObject(name: string) {
    return DATES.get(name);
}
function getDates(dateObject: DateObject): number[] {
    const epochStart = Date.parse(dateObject.start);
    const epochEnd = Date.parse(dateObject.end);
    const dates = [];
    for (let i = 0; i < dateObject.nb; i++) {
        const epoch = epochStart + i * (epochEnd - epochStart) / dateObject.nb;
        dates.push(epoch);
    }
    return dates;
}

function getNextDate(dateObject: DateObject): number | undefined {
    const now = Date.now();
    const dates = getDates(dateObject);

    for (const date of dates) {
        if (date > now) {
            return date;
        }
    }
    return undefined;
}

function getNextDates(dateObject: DateObject): number[] {
    const now = Date.now();
    const dates = getDates(dateObject);
    const nextDates = [];
    for (const date of dates) {
        if (date > now) {
            nextDates.push(date);
        }
    }
    return nextDates;
}

export { getDateObject, getDates, getNextDate, getNextDates };