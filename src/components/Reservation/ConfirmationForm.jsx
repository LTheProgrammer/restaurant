import { useState } from 'react';
import './ConfirmationForm.css';

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

    const confirm = (e) => {
        e.preventDefault();
        if (name && lastName && email && occasion) {
            // eslint-disable-next-line no-undef
            const success = submitAPI({ ...props, name, lastName, email, occasion });
            if (success) {
                alert('Reservation Confirmed');
                window.location.href = '/home';
                return;
            }
            alert('Failed to submit form');
            return
        }
        alert('One of the field is invalid');
    };

    return (
        <div className='confirmation-form'>
            <div className='confirmation-content'>
                <form
                    role="form"
                    aria-labelledby="confirmation-form-title"
                    onSubmit={confirm}
                >
                    <h2 id="confirmation-form-title" className="sr-only">
                        Confirm Your Reservation Details
                    </h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1vh' }}>
                        <div className='form-field'>
                            <label htmlFor="customer-name">Name :</label>
                            <input
                                id="customer-name"
                                className='text-input'
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                aria-label="Your first name"
                                aria-required="true"
                                aria-describedby="name-help"
                            />
                            <div id="name-help" className="sr-only">
                                Enter your first name for the reservation
                            </div>
                        </div>

                        <div className='form-field'>
                            <label htmlFor="customer-lastname">Last Name :</label>
                            <input
                                id="customer-lastname"
                                className='text-input'
                                type="text"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                aria-label="Your last name"
                                aria-required="true"
                                aria-describedby="lastname-help"
                            />
                            <div id="lastname-help" className="sr-only">
                                Enter your last name for the reservation
                            </div>
                        </div>

                        <div className='form-field'>
                            <label htmlFor="customer-email">Email :</label>
                            <input
                                id="customer-email"
                                className='text-input'
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                aria-label="Your email address"
                                aria-required="true"
                                aria-describedby="email-help"
                            />
                            <div id="email-help" className="sr-only">
                                Enter your email address for reservation confirmation
                            </div>
                        </div>

                        <label htmlFor="occasion-select" className="sr-only">
                            Select occasion for your reservation
                        </label>
                        <select
                            id="occasion-select"
                            name="occasion"
                            value={occasion}
                            onChange={(e) => setOccasion(e.target.value)}
                            style={{ padding: '1vw' }}
                            aria-label="Occasion for reservation"
                            aria-required="true"
                            aria-describedby="occasion-help"
                        >
                            <option value="">Occasion</option>
                            <option value="birthday">Birthday</option>
                            <option value="engagement">Engagement</option>
                            <option value="anniversary">Anniversary</option>
                        </select>
                        <div id="occasion-help" className="sr-only">
                            Select the occasion for your reservation
                        </div>

                        <div
                            role="group"
                            aria-labelledby="reservation-summary-title"
                            aria-live="polite"
                        >
                            <h3 id="reservation-summary-title" className="sr-only">
                                Reservation Summary
                            </h3>
                            <label aria-label={`Reservation date and time: ${date} at ${selectedTimeSlot}`}>
                                {`${date} - ${selectedTimeSlot} `}
                            </label>
                            <label aria-label={`Number of guests: ${numberOfPeople} persons`}>
                                {`${numberOfPeople} persons `}
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ marginTop: '1rem', paddingLeft: '3vw', paddingRight: '3vw' }}
                        aria-label="Confirm reservation and submit booking"
                        aria-describedby="confirm-help"
                    >
                        Confirm
                    </button>
                    <div id="confirm-help" className="sr-only">
                        Click to confirm your reservation. All fields must be filled out.
                    </div>
                </form>

                <img
                    alt="Greek salad dish from Little Lemon restaurant"
                    src="assets/greek salad.jpg"
                    style={{ maxWidth: '25vw' }}
                    role="img"
                    aria-describedby="food-image-desc"
                />
                <div id="food-image-desc" className="sr-only">
                    Decorative image showing a Greek salad from Little Lemon restaurant
                </div>
            </div>
        </div>
    );
};

export default ConfirmationForm;