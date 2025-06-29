import './ReviewCard.css';

const ReviewCard = (props) => {
    return (
        <div className='review-card'>
            {props.rating}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img alt={props.name} src={props.src} />
                <b style={{ margin: '1rem' }}>{props.name}</b>
            </div>
            <i>{props.comment}</i>
        </div>
    );
};

export default ReviewCard;