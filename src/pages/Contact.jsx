import React from "react";
import "./Contact.css";

const Contact = () => {
    return (
        <div className="contact">
            <h1>Contact Us</h1>

            <p>
                For any queries, feedback, or support regarding the Student ID Card
                Generator project, feel free to contact us.
            </p>

            <h3>ABC Engineering College</h3>

            <p>Hyderabad, Telangana</p>

            <p>
                <strong>Email:</strong> support@abcengineeringcollege.edu
            </p>

            <p>
                <strong>Phone:</strong> +91 9441798722
            </p>

            <h3>Project Team</h3>

            <p className="contact-list">S. Sahasra
                <br>
                </br>
                P. Tejaswini
            </p>

        </div>
    );
};

export default Contact;