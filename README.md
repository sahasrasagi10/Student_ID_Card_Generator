# Student ID Card Generator

## Overview
The Student ID Card Generator is a web-based application developed using React and Vite. It allows institutions to generate student ID cards in bulk by uploading a CSV file containing student information and a folder containing student photographs.

The system automatically maps student images with roll numbers, generates front and back ID cards with QR codes, and provides an option to download all generated ID cards as a single PDF.

## Features
- Student registration and login
- CSV-based student data upload
- Automatic image mapping using roll numbers
- Front and back ID card generation
- QR code generation
- Bulk PDF download of all ID cards
- Responsive user interface

## Technologies Used
- React.js
- Vite
- JavaScript
- HTML5
- CSS3
- QRCode Library
- jsPDF
- html2canvas

## Project Structure

```text
src/
├── components/
├── pages/
├── assets/
├── App.jsx
├── main.jsx

public/
├── logo.png
├── favicon.png