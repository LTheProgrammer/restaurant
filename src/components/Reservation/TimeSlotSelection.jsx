import { useState } from 'react';
import './TimeSlotSelection.css';

const TimeSlotSelection = (props) => {
    const {
        timeSlots,
        numberOfPeople,
        setNumberOfPeople,
        date,
        setDate,
        selectedTimeSlot,
        setSelectedTimeSlot,
        setDisplayForm
    } = props;

    const handleReserve = () => {
        if (numberOfPeople > 0 && numberOfPeople < 20 && date && selectedTimeSlot) {
            setDisplayForm(true);
        }
    };

    return (
        <div className='reservation' role="form" aria-labelledby="reservation-form-title">
            <h2 id="reservation-form-title" className="sr-only">Make a Reservation</h2>

            <div className='form-field'>
                <div className='form-field'>
                    <label htmlFor="number-of-people">Number of people</label>
                    <input
                        id="number-of-people"
                        className='number-input'
                        type="number"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        min="1"
                        max="20"
                        aria-label="Number of people for reservation"
                        aria-describedby="people-help"
                        aria-required="true"
                    />
                    <div id="people-help" className="sr-only">
                        Enter number of people between 1 and 20
                    </div>
                </div>

                <div className='form-field'>
                    <label htmlFor="reservation-date">Date</label>
                    <input
                        id="reservation-date"
                        className='date-input'
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        aria-label="Reservation date"
                        aria-required="true"
                    />
                </div>
            </div>

            <div
                className='time-slot-container'
                role="group"
                aria-labelledby="time-slots-title"
                aria-required="true"
            >
                <h3 id="time-slots-title" className="sr-only">Available Time Slots</h3>
                {timeSlots.map((slot) => (
                    <button
                        key={slot}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={selectedTimeSlot === slot ?
                            { backgroundColor: '#F4CE14', color: 'white', border: 'solid 1px white' } :
                            { backgroundColor: '#F4CE14', color: 'black' }
                        }
                        aria-label={`Select time slot ${slot}`}
                        aria-pressed={selectedTimeSlot === slot}
                        aria-describedby={selectedTimeSlot === slot ? "selected-time-help" : undefined}
                    >
                        {slot}
                    </button>
                ))}
                {selectedTimeSlot && (
                    <div id="selected-time-help" className="sr-only">
                        Selected time slot: {selectedTimeSlot}
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <button
                    type="button"
                    onClick={handleReserve}
                    style={{ paddingLeft: '8vw', paddingRight: '8vw' }}
                    aria-label="Reserve table for selected date and time"
                    aria-describedby="reserve-requirements"
                    disabled={!numberOfPeople || numberOfPeople <= 0 || numberOfPeople >= 20 || !date || !selectedTimeSlot}
                >
                    Reserve
                </button>
                <div id="reserve-requirements" className="sr-only">
                    To reserve, please select number of people (1-19), date, and time slot
                </div>
            </div>
        </div>
    );
};

export default TimeSlotSelection;