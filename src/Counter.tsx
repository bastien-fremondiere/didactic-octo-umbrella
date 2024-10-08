
import { useEffect, useState } from 'react';
// import { getCurrentPrizes, getDateObject, getInterval, getNextDate, getNextDates } from './data';
import { getDateObject, getNextDate, getNextDates } from './data';

function Counter({ name }: { name: string }) {
    function getDurationAsString(seconds: number) {
        return new Date(seconds * 1000).toISOString().substr(11, 8);
    }
    const dateObject = getDateObject(name);
    const nearestDate = dateObject ? getNextDate(dateObject) : undefined;
    const now = Date.now();
    let [timeRemaining, setTimeRemaining] = useState(nearestDate ? Math.round((nearestDate - now) / 1000) : 0);
    useEffect(() => {
        const interval = setInterval(() => {
            if (nearestDate) {
                const now = Date.now();
                setTimeRemaining(Math.round((nearestDate - now) / 1000));
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [nearestDate]);

    return (
        <div>
            <div>Play in {getDurationAsString(timeRemaining)}</div>
            {/* <div>Interval {dateObject && getDurationAsString(getInterval(dateObject) / 1000)}</div> */}

            {/* <h1>Counter</h1>
            <p>
                {nearestDate ? `Next date: ${new Date(nearestDate).toLocaleString('fr-FR', { timeZone: 'CET' })}` : 'No date found'}
            </p> */}
            {/* <h1>Prizes</h1>
            <ul>
                {
                    dateObject && getCurrentPrizes(dateObject).map((prize, index) => (
                        <div key={index}>{prize.name}: {prize.count} / {dateObject.prices[index].count}</div>
                    ))
                }
            </ul> */}
            <h1>List of dates</h1>
            <ul>
                {dateObject && getNextDates(dateObject).map((date) => (
                    <div key={date} style={{
                        fontWeight: date == nearestDate ? 'bold' : 'normal'
                    }}>{new Date(date).toLocaleString('fr-FR', { timeZone: 'CET' })}</div>
                ))}
            </ul>
            {/* <table className="table">
                <thead>
                    <tr>
                        <th>Start</th>
                        <th>End</th>
                        <th>Number of dates</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{dateObject && new Date(Date.parse(dateObject.start)).toString()}</td>
                        <td>{dateObject && new Date(Date.parse(dateObject.end)).toString()}</td>
                        <td>{dateObject?.nb}</td>
                    </tr>
                </tbody>
            </table> */}

        </div>
    );
}

export default Counter;