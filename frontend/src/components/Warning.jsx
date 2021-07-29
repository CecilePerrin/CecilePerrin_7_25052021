import React, {useState} from "react";
import "../styles/warning.css";
import { Alert } from 'react-bootstrap';

const Warning = () => {
	const [show, setShow] = useState(true);

	if (show) {
		return (
		  <Alert variant="danger" onClose={() => setShow(false)} dismissible>
			<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
			<p>
			  Please got check if your mail or password are the good one and retry to connect.
			</p>
		  </Alert>
		);
	  }
	}
	

export default Warning;