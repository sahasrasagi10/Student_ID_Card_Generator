// import { textAlign } from 'html2canvas/dist/types/css/property-descriptors/text-align';
import React from 'react'
import "./About.css";

const About = () => {
    return (
        <div className='about'>
            <h2>About Student ID Card Generator</h2>
            <p>
                The Student ID Card Generator is a web-based application developed using React and Vite. It allows institutions to generate student ID cards in bulk by uploading a CSV file containing student information and a folder of student photographs.

                The system automatically maps student images with roll numbers, generates front and back ID cards with QR codes, and provides an option to download all ID cards as a single PDF. This reduces manual effort and ensures faster ID card creation.

                <br></br>
                <h4 className='h4'>Features: </h4>
                <br></br>
                <ul className='ulist'>
                    <li>Bulk student data upload using CSV</li>
                    <li>Automatic image mapping using roll numbers</li>
                    <li> Front and back ID card generation</li>
                    <li> QR code integration</li>
                    <li>Single PDF download for all student ID cards</li>

                </ul>
            </p>
        </div>
    )
}

export default About;
