import './CardDisplay.css';

const CardDisplay = ({ children }) => {
    return (
        <div className='card-container'>
            {children}
        </div>
    );
};

export default CardDisplay;