
import CardDisplay from '../components/CardDisplay/CardDisplay';
import ReviewCard from '../components/CardDisplay/ReviewCard';
import SpecialCard from '../components/CardDisplay/SpecialCard';
import './Main.css';

const reviewsData = [
    {
        rating: "⭐⭐⭐⭐⭐",
        name: "Emma",
        src: "assets/Emma.PNG",
        comment: "Magnifico!"
    },
    {
        rating: "⭐⭐⭐⭐",
        name: "Tyler",
        src: "assets/tyler.jpg",
        comment: "Would buy again!"
    },
    {
        rating: "⭐⭐⭐⭐⭐",
        name: "Noemie",
        src: "assets/Noemie.PNG",
        comment: "My go to after a night out!"
    }
];

const specialsData = [
    {
        name: "Greek Salad",
        price: "$12.99",
        src: "assets/greek salad.jpg",
        description: "The famous greek salad of crispy lettuce, peppers, olives and our Chicago style feta cheese, garnished with crunchy garlic and rosemary croutons."
    },
    {
        name: "Bruchetta",
        price: "$5.99",
        src: "assets/bruchetta.svg",
        description: "Our Bruschetta is made from grilled bread that has been smeared with garlic and seasoned with salt and olive oil."
    },
    {
        name: "Lemon Dessert",
        price: "$5.00",
        src: "assets/restauranfood.jpg",
        description: "This comes straight from grandma's recipe book, every last ingredient has been sourced and is as authentic as can be imagined."
    }
];

const Main = () => {
    return (
        <main style={{ width: '80%' }}>
            <section className='hero'>
                <div className="hero-content">
                    <div>
                        <h1 style={{ color: "#F4CE14" }}>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>Tout a commencé en 2018 quand Mario et Adrian, deux amis d'enfance passionnés de
                            cuisine méditerranéenne, ont décidé de transformer leur rêve en réalité dans les
                            rues animées de Chicago. Inspirés par les saveurs authentiques que Mario avait
                            découvertes lors de ses voyages en Italie et en Grèce, et par l'expertise culinaire
                            qu'Adrian avait développée dans les cuisines de restaurants étoilés, ils ont uni leurs
                            forces pour créer Little Lemon...</p>
                        <button
                            style={{ marginTop: '1rem' }}
                            className="reserve-btn"
                            onClick={() => window.location.href = '/reservation'}
                        >
                            Reserve a table
                        </button>
                    </div>
                    <div>
                        <img alt="bruchetta" src="assets/bruchetta.svg" style={{ maxWidth: '30vw' }} />
                    </div>
                </div>
            </section>
            <section className='special'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70vw', width: '100%' }} >
                        <h1 style={{ fontSize: '2rem' }}>Specials</h1>
                        <button style={{ marginTop: '1rem', alignSelf: 'flex-end' }} className="reserve-btn">Online Menu</button>
                    </div>
                </div>
                <CardDisplay>
                    {
                        specialsData.map((e, i) => <SpecialCard key={e.name + i} {...e} />)
                    }
                </CardDisplay>
            </section>
            <section className='review'>
                <h1 style={{ fontSize: '2rem', textAlign: 'center' }}>Testimonials</h1>
                <CardDisplay>
                    {
                        reviewsData.map((e, i) => <ReviewCard key={e.name + i} {...e} />)
                    }
                </CardDisplay>
            </section>
            <section className='about'>
                <div className="about-content">
                    <div>
                        <h1 style={{ color: "#F4CE14" }}>Little Lemon</h1>
                        <h2>Chicago</h2>
                        <p>Tout a commencé en 2018 quand Mario et Adrian, deux amis d'enfance passionnés de
                            cuisine méditerranéenne, ont décidé de transformer leur rêve en réalité dans les
                            rues animées de Chicago. Inspirés par les saveurs authentiques que Mario avait
                            découvertes lors de ses voyages en Italie et en Grèce, et par l'expertise culinaire
                            qu'Adrian avait développée dans les cuisines de restaurants étoilés, ils ont uni leurs
                            forces pour créer Little Lemon. Le nom est né d'un souvenir partagé : un petit citronnier
                            dans la cour de la grand-mère de Mario, dont les fruits parfumaient tous les plats familiaux.
                            Aujourd'hui, Little Lemon est devenu le refuge culinaire qu'ils avaient imaginé, où
                            chaque plat raconte une histoire et où l'hospitalité chaleureuse fait de chaque repas
                            un moment inoubliable.</p>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start', // Change ça de 'flex-end' à 'flex-start'
                    }}>
                        <img
                            alt="marioAndAdianA"
                            src="assets/Mario and Adrian A.jpg"
                            style={{
                                maxWidth: '25vw',
                                marginBottom: '-60px',
                            }}
                        />
                        <img
                            alt="marioAndAdianB"
                            src="assets/Mario and Adrian B.jpg"
                            style={{
                                maxWidth: '25vw',
                                transform: 'translateX(-80px)',
                            }}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Main;