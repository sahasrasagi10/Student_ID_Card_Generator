import { useState } from "react";
import Papa from "papaparse";
import { QRCodeCanvas } from "qrcode.react";
import "./Generator.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function Generator() {

    const [students, setStudents] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState(null);

    const [images, setImages] = useState({});

    // CSV UPLOAD

    const handleCSVUpload = (e) => {

        const file = e.target.files[0];

        Papa.parse(file, {

            header: true,

            skipEmptyLines: true,

            complete: function (results) {

                setStudents(results.data);
            }
        });
    };

    // IMAGE FOLDER UPLOAD

    const handleImageUpload = (e) => {

        const files = e.target.files;

        let imageMap = {};

        for (let i = 0; i < files.length; i++) {

            const file = files[i];

            const rollNumber = file.name.split(".")[0];

            const reader = new FileReader();

            reader.onload = () => {

                imageMap[rollNumber] = reader.result;

                setStudentImages((prev) => ({
                    ...prev,
                    ...imageMap
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    // SHOW SELECTED STUDENT

    const showStudentCard = (student) => {

        const studentWithPhoto = {

            ...student,

            photo: images[student.roll]
        };

        setSelectedStudent(studentWithPhoto);
    };

    const downloadPDF = async () => {

        const pdf = new jsPDF("landscape");

        for (let i = 0; i < students.length; i++) {

            const student = students[i];

            setSelectedStudent(student);

            await new Promise((resolve) =>
                setTimeout(resolve, 1000)
            );

            const card = document.getElementById("pdf-card");

            const images = card.getElementsByTagName("img");

            await Promise.all(
                Array.from(images).map((img) => {

                    if (img.complete) {
                        return Promise.resolve();
                    }

                    return new Promise((resolve) => {
                        img.onload = resolve;
                        img.onerror = resolve;
                    });
                })
            );

            const canvas = await html2canvas(card, {

                useCORS: true,

                scale: 2
            });

            const imgData = canvas.toDataURL("image/png");

            const imgWidth = 280;

            const imgHeight =
                (canvas.height * imgWidth) / canvas.width;

            if (i > 0) {

                pdf.addPage();
            }

            pdf.addImage(
                imgData,
                "PNG",
                10,
                10,
                imgWidth,
                imgHeight
            );
        }

        pdf.save("Student_ID_Cards.pdf");
    };
    return (

        <div className="generator-container">

            <h1>Bulk Student ID Card Generator</h1>

            <p>
                Upload CSV file and student images folder
            </p>

            {/* UPLOAD SECTION */}

            <div className="upload-section">

                <label className="upload-box">

                    Upload CSV File

                    <input
                        type="file"
                        accept=".csv"
                        onChange={handleCSVUpload}
                        hidden
                    />

                </label>

                <label className="upload-box">

                    Upload Images Folder

                    <input
                        type="file"
                        webkitdirectory="true"
                        accept="image/*"
                        onChange={handleImageUpload}
                        hidden
                    />

                </label>

            </div>

            {/* ROLL NUMBER BUTTONS */}

            <div className="student-buttons">

                {students.map((student, index) => (

                    <button
                        key={index}
                        className="roll-btn"
                        onClick={() => showStudentCard(student)}
                    >
                        {student.roll}
                    </button>

                ))}

            </div>

            {/* ID CARD */}
            <button
                className="download-btn"
                onClick={downloadPDF}
            >
                Download All Cards PDF
            </button>

            {
                selectedStudent && (

                    <div className="cards-container" id="pdf-card">

                        {/* FRONT CARD */}

                        <div className="id-card">

                            <div className="card-header">

                                <img
                                    src="/logo.png"
                                    alt="College Logo"
                                    className="college-logo"
                                />

                                <div className="college-name">
                                    ABC ENGINEERING COLLEGE
                                </div>

                            </div>

                            <div className="profile-circle">

                                {
                                    selectedStudent.photo ? (

                                        <img
                                            src={
                                                studentImages[
                                                String(selectedStudent.rollNumber).trim()
                                                ]
                                            }
                                            alt="Student"
                                        />

                                    ) : (

                                        "PHOTO"
                                    )
                                }

                            </div>

                            <div className="student-details">

                                <p>
                                    <strong>Name:</strong>
                                    {selectedStudent.name}
                                </p>

                                <p>
                                    <strong>Roll Number:</strong>
                                    {selectedStudent.roll}
                                </p>

                                <p>
                                    <strong>Department:</strong>
                                    {selectedStudent.department}
                                </p>

                                <p>
                                    <strong>Year:</strong>
                                    {selectedStudent.year}
                                </p>

                            </div>

                        </div>

                        {/* BACK CARD */}

                        <div className="back-card">

                            <h2>STUDENT ADDRESS</h2>

                            <p>{selectedStudent.address}</p>

                            <div className="extra-details">

                                <p>
                                    <strong>Blood Group:</strong> {selectedStudent.blood}
                                </p>

                                <p>
                                    <strong>Mobile:</strong> {selectedStudent.mobile}
                                </p>

                            </div>
                            <div className="qr-box">

                                <QRCodeCanvas
                                    value="https://www.abccollege.com"
                                    size={120}
                                />

                            </div>

                            <div className="college-address">

                                ABC Engineering College
                                <br />

                                Hyderabad, Telangana

                            </div>

                        </div>

                    </div>

                )
            }

        </div>
    );
}

export default Generator;