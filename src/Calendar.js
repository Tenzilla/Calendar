import React, { useState } from 'react';
import './Calendar.css';

const Calendar = () => {
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const handlePreviousMonth = () => {
        const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        setCurrentMonth(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    const getPreviousMonthName = () => {
        const previousMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1);
        return previousMonth.toLocaleString('default', { month: 'long' });
    };

    const getNextMonthName = () => {
        const nextMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1);
        return nextMonth.toLocaleString('default', { month: 'long' });
    };

    const getDaysInMonth = () => {
        const days = [];
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const numDays = monthEnd.getDate();

        for (let i = 0; i < monthStart.getDay(); i++) {
            days.push(<div key={`empty-${i}`} className="cell empty" />);
        }

        for (let i = 1; i <= numDays; i++) {
            const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i);
            const isCurrentDay = date.toDateString() === new Date().toDateString();
            days.push(
                <div
                    key={`day-${i}`}
                    className={`cell ${isCurrentDay ? 'current-day' : ''}`}
                    onClick={() => handleClick(date)}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    const handleClick = (date) => {
        const day = date.toLocaleDateString('default', { weekday: 'long' });
        const dayOfMonth = date.getDate();
        const month = date.toLocaleDateString('default', { month: 'long' });
        const year = date.getFullYear();

        console.log(`Selected Date: ${day}, ${dayOfMonth} ${month} ${year}`);
    };

    return (
        <div className="calendar-container">
            <div className="pagination">
                <div className="arrow" onClick={handlePreviousMonth}>{`< ${getPreviousMonthName()}`}</div>
                <div className="current-month">{currentMonth.toLocaleString('default', { month: 'long' })}</div>
                <div className="arrow" onClick={handleNextMonth}>{`${getNextMonthName()} >`}</div>
            </div>
            <div className="title">{`Calendar for ${currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}`}</div>
            <div className="calendar">
                <div className="header">
                    <div className="day">Sun</div>
                    <div className="day">Mon</div>
                    <div className="day">Tue</div>
                    <div className="day">Wed</div>
                    <div className="day">Thu</div>
                    <div className="day">Fri</div>
                    <div className="day">Sat</div>
                </div>
                <div className="grid">
                    {getDaysInMonth()}
                </div>
            </div>
        </div>
    );
};

export default Calendar;
