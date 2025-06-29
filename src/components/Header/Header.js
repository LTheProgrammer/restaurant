import NavBar from "../NavBar/Nav";

const Header = () => {
    return (
        <header style={{ display: "flex", padding: '1rem', justifyContent: "space-evenly", width: "80%" }}>
            <img alt="logo" src="assets/logo.svg" />
            <NavBar />
        </header>
    );
};

export default Header;