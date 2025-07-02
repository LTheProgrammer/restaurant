import { useEffect, useState } from 'react';
import ConfirmationForm from '../components/Reservation/ConfirmationForm';
import TimeSlotSelection from '../components/Reservation/TimeSlotSelection';

const ReservationPage = () => {
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [date, setDate] = useState('');
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [displayForm, setDisplayForm] = useState(false);
    const [timeSlots, setTimeSlots] = useState([]);

    useEffect(() => {
        if (date) {
            // eslint-disable-next-line no-undef
            setTimeSlots(fetchAPI(new Date(date)));
        }
    }, [date]);

    return (
        displayForm ?
            <ConfirmationForm
                numberOfPeople={numberOfPeople}
                date={date}
                selectedTimeSlot={selectedTimeSlot}
            />
            :
            <TimeSlotSelection
                timeSlots={timeSlots}
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