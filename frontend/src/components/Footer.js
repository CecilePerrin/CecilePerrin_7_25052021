import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
function Footer() {
	return (
		<footer className=" footer">
			<Link to="#">About </Link>
			<Link to="#">Contact</Link>
			<Link to="#">Mentions Légales</Link>
		</footer>
	);
}
export default Footer;