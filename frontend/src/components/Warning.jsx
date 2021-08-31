import React, {useState} from "react";
import "../styles/warning.css";
import { Alert } from 'react-bootstrap';




const Warning = (satus, errorMessage) => {
	const [show, setShow] = useState(true);

	if (show) {
		return (
		  <Alert variant="danger" onClose={() => setShow(false)} dismissible>
			<Alert.Heading>Oh snap! You got an error!</Alert.Heading>
			<p>
			 {satus, errorMessage}.
			</p>
		  </Alert>
		);
	  }
	}
	

export default Warning;