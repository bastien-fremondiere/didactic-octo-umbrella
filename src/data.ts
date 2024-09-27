type DateObject = {
    start: string,
    end: string,
    nb: number,
    prices: {
        name: string,
        count: number
    }[]
};

const DATES = new Map<string, DateObject>([
    // ['FANTA', {
    //     start: '2024-08-14T10:00:00.000+02:00',
    //     end: '2024-09-30T23:59:59.999+02:00',
    //     nb: 230,
    //     prices: [
    //         {
    //             name: 'Sejour Inoubliable',
    //             count: 5
    //         },
    //         {
    //             name: 'Sejour magique',
    //             count: 100
    //         },
    //         {
    //             name: 'Billets',
    //             count: 125
    //         }
    //     ]
    // }],
    // ['MARVEL', {
    //     start: '2024-09-02T10:00:00.000+02:00',
    //     end: '2024-10-31T23:59:59.999+02:00',
    //     nb: 120,
    //     prices: [
    //         {
    //             name: 'Experience',
    //             count: 5
    //         },
    //         {
    //             name: 'Week end',
    //             count: 40
    //         },
    //         {
    //             name: 'Invitation',
    //             count: 30
    //         },
    //         {
    //             name: 'Veste',
    //             count: 45
    //         }
    //     ]
    // }],
    ['TERRIFIANT', {
        start: '2024-09-02T10:00:00.000+02:00',
        end: '2024-11-15T23:59:59.999+02:00',
        nb: 600,
        prices: [
            {
                name: 'KIT',
                count: 100
            },
            {
                name: 'CINE',
                count: 500
            }
        ]
    }],
]);

function getDateObject(name: string) {
    return DATES.get(name);
}

function getInterval(dateObject: DateObject): number {
    const epochStart = Date.parse(dateObject.start);
    const epochEnd = Date.parse(dateObject.end);
    return (epochEnd - epochStart) / dateObject.nb;
}

function getAlpha(dateObject: DateObject, index: number): number {
    return index / dateObject.nb;
}

function getMagicNumber(dateObject: DateObject, index: number): number {
    return 0.25 * (1. - getAlpha(dateObject, index)) + 0.2;
}

function getDates(dateObject: DateObject): number[] {
    const epochStart = Date.parse(dateObject.start);
    const epochEnd = Date.parse(dateObject.end);
    const dates = [];
    for (let i = 0; i < dateObject.nb; i++) {
        const epoch = getInterval(dateObject) * getMagicNumber(dateObject, i) + epochStart + i * (epochEnd - epochStart) / dateObject.nb;
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
        if (date > now - 600 * 60 * 1000) {
            nextDates.push(date);
        }
    }
    return nextDates;
}

function getPassedDatesCount(dateObject: DateObject) {
    const now = Date.now();
    let count = 0;
    const dates = getDates(dateObject);
    for (const date of dates) {
        if (date < now) {
            count++;
        }
    }
    return count;
}

function getMaxRatio(prizesReal: { name: string, count: number }[], prizes: { name: string, count: number }[]) {
    let maxRatio = 0;
    let maxIndex = 0;
    for (let i = 0; i < prizesReal.length; i++) {
        const ratio = prizesReal[i].count / prizes[i].count;
        if (ratio > 0 && ratio > maxRatio) {
            maxRatio = ratio;
            maxIndex = i;
        }
    }
    return maxIndex;
}

function getCurrentPrizes(dateObject: DateObject) {
    let passedCount = getPassedDatesCount(dateObject);

    let prizes = dateObject.prices;
    let prizesReal = dateObject.prices.map(prize => ({ ...prize }));

    while (passedCount > 0) {
        let index = getMaxRatio(prizesReal, prizes);
        prizesReal[index].count--;
        passedCount--;
    }
    return prizesReal;
}

export { getInterval, getDateObject, getDates, getNextDate, getNextDates, getCurrentPrizes };