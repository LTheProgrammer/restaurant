import './Nav.css';

const NavBar = () => {
    return (
        <nav>
            {
                [
                    { link: '/link1', text: 'Link 1' },
                    { link: '/link2', text: 'Link 2' },
                    { link: '/link3', text: 'Link 3' },
                    { link: '/link4', text: 'Link 4' }
                ].map(
                    (e) => (<a href={e.link}>{e.text}</a>)
                )
            }
        </nav>
    );
};

export default NavBar;