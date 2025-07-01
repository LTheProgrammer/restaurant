import { useState } from 'react';
import ConfirmationForm from '../components/Reservation/ConfirmationForm';
import TimeSlotSelection from '../components/Reservation/TimeSlotSelection';

const ReservationPage = () => {
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [date, setDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [displayForm, setDisplayForm] = useState(false);


    return (
        displayForm ?
            <ConfirmationForm
                numberOfPeople={numberOfPeople}
                date={date}
                selectedTimeSlot={selectedTimeSlot}
            />
            :
            <TimeSlotSelection
                numberOfPeople={numberOfPeople}
                setNumberOfPeople={setNumberOfPeople}
                date={date}
                setDate={setDate}
                selectedTimeSlot={selectedTimeSlot}
                setSelectedTimeSlot={setSelectedTimeSlot}
                displayForm={displayForm}
                setDisplayForm={setDisplayForm}
            />
    );
};

export default ReservationPage;