import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <img alt="footer_logo" src="assets/logo_vertical.png" style={{ maxWidth: '10rem' }} />
            <section>
                <b>Doormat Navigation</b>
                {
                    [
                        { link: '/home', text: 'Home' },
                        { link: '/about', text: 'About' },
                        { link: '/menu', text: 'Menu' },
                        { link: '/reservation', text: 'Reservation' },
                        { link: '/order-online', text: 'Order Online' },
                        { link: '/login', text: 'Login' }
                    ].map(
                        (e, i) => (<a key={e.text + i} href={e.link}>{e.text}</a>)
                    )
                }
            </section>
            <section>
                <b>Contact</b>
                <span>Address</span>
                <span>Phone Number</span>
                <span>Email</span>
            </section>
            <section>
                <b>Social Media</b>
                {
                    [
                        { link: '/linkedin', text: 'Linkedin' },
                        { link: '/instagram', text: 'Instagram' },
                        { link: '/x', text: 'X' },
                    ].map(
                        (e, i) => (<a key={e.text + i} href={e.link}>{e.text}</a>)
                    )
                }
            </section>
        </footer>
    );
};

export default Footer;