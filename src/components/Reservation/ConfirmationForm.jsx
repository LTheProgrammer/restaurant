import { useState } from 'react';
import './ConfirmationForm.css';

const options = ['Birthday', 'Engagement', 'Anniversary'];

const ConfirmationForm = (props) => {
    const {
        numberOfPeople,
        date,
        selectedTimeSlot,
    } = props;

    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [occasion, setOccasion] = useState('');
    const [isOpen, setIsOpen] = useState(false);


    const confirm = () => {
        if (name && lastName && email && occasion) {
            alert('Reservation Confirmed');
            window.location.href = '/home';
        }
    };

    const handleSelect = (option) => {
        setOccasion(option);
        setIsOpen(false);
    };

    return (
        <div className='confirmation-form'>
            <div className='confirmation-content'>
                <div >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                        <div className='form-field'>
                            <label >Name :</label>
                            <input
                                className='text-input'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className='form-field'>
                            <label>Last Name :</label>
                            <input
                                className='text-input'
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                            />
                        </div>
                        <div className='form-field'>
                            <label>Email :</label>
                            <input
                                className='text-input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <select
                            name="occasion"
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            style={{ padding: '1vw' }}
                        >
                            <option value="">Occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="engagement">Engagement</option>
                            <option value="anniversary">Anniversary</option>
                        </select>
                        <label>{`${date} - ${selectedTimeSlot} `}</label>
                        <label>{`${numberOfPeople} persons `}</label>
                    </div>
                    <button
                        style={{ marginTop: '1rem', paddingLeft: '3vw', paddingRight: '3vw' }}
                        onClick={confirm}
                    >
                        Confirm
                    </button>
                </div>
                <img
                    alt="food"
                    src="assets/greek salad.jpg"
                    style={{
                        maxWidth: '25vw'
                    }}
                />
            </div>
        </div>
    );
};

export default ConfirmationForm;