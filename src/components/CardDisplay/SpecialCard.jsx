import './SpecialCard.css';

const SpecialCard = (props) => {
    return (
        <div className='special-card' onClick={() => window.location.href = `/order-online?item=${props.name}`}>
            <img alt={props.name} src={props.src} />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <b style={{ margin: '1rem' }}>{props.name}</b>
                <b style={{ margin: '1rem' }}>{props.price}</b>
            </div>
            <div style={{ padding: '0.5rem' }}>{props.description}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <b style={{ margin: '1rem' }}>Order Online <img className='icon' alt='creditCard' src="assets/creditcard.svg"></img></b>
            </div>
        </div>
    );
};

export default SpecialCard;