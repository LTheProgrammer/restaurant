import './Nav.css';

const NavBar = () => {
    return (
        <nav>
            {
                [
                    { link: '/home', text: 'Home' },
                    { link: '/about', text: 'About' },
                    { link: '/menu', text: 'Menu' },
                    { link: '/reservation', text: 'Reservation' },
                    { link: '/order-online', text: 'Order Online' },
                    { link: '/login', text: 'Login' }
                ].map(
                    (e) => (<a href={e.link}>{e.text}</a>)
                )
            }
        </nav>
    );
};

export default NavBar;