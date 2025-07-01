import { useState } from 'react';
import './TimeSlotSelection.css';

const timeSlots = [
    'TimeSlot1', 'TimeSlot2', 'TimeSlot3', 'TimeSlot4', 'TimeSlot5',
    'TimeSlot6', 'TimeSlot7', 'TimeSlot8', 'TimeSlot9', 'TimeSlot10'
];

const TimeSlotSelection = (props) => {
    const {
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
        <div className='reservation' style={{}}>
            <div className='form-field'>
                <div className='form-field'>
                    <label >Number of people</label>
                    <input
                        className='number-input'
                        type="number"
                        value={numberOfPeople}
                        onChange={(e) => setNumberOfPeople(e.target.value)}
                        style={{}}
                        min="1"
                        max="20"
                    />
                </div>
                <div className='form-field'>
                    <label style={{}}>Date</label>
                    <input
                        className='date-input'
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        style={{}}
                    />
                </div>
            </div>
            <div className='time-slot-container'>
                {timeSlots.map((slot) => (
                    <button
                        key={slot}
                        onClick={() => setSelectedTimeSlot(slot)}
                        style={selectedTimeSlot === slot ? { backgroundColor: '#F4CE14', color: 'white', border: 'solid 1px white' } : { backgroundColor: '#F4CE14', color: 'black' }}
                    >
                        {slot}
                    </button>
                ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem' }}>
                <button
                    onClick={handleReserve}
                    style={{ paddingLeft: '8vw', paddingRight: '8vw' }}
                >
                    Reserve
                </button>
            </div>
        </div>
    );
};

export default TimeSlotSelection;