import NavBar from "../NavBar/Nav";

const Header = () => {
    return (
        <header style={{ display: "flex" }}>
            <img alt="logo" src="assets/logo.svg" />
            <NavBar />
        </header>
    );
};

export default Header;