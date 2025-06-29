import NavBar from "../NavBar/Nav";

const Header = (props) => {
    return (
        <header style={{ display: "flex", padding: '1rem', justifyContent: "space-evenly", width: "80%" }}>
            <img alt="logo" src="assets/logo.svg" onClick={() => props.navigate('home')} />
            <NavBar navigate={props.navigate} />
        </header>
    );
};

export default Header;