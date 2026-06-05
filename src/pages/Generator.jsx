
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

                setImages((prev) => ({
                    ...prev,
                    ...imageMap
                }));
            };

            reader.readAsDataURL(file);
        }
    };

    // SHOW STUDENT CARD

    const showStudentCard = (student) => {

        setSelectedStudent(student);
    };

    // DOWNLOAD PDF

    const downloadPDF = async () => {

        const pdf = new jsPDF("landscape");

        for (let i = 0; i < students.length; i++) {

            setSelectedStudent(students[i]);

            await new Promise((resolve) =>
                setTimeout(resolve, 1200)
            );

            const card = document.getElementById("pdf-card");

            const canvas = await html2canvas(card, {

                scale: 2,

                useCORS: true
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

            <h1>Student ID Card Generator</h1>

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

            {/* ROLL BUTTONS */}

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

            {/* DOWNLOAD BUTTON */}

            {
                students.length > 0 && (

                    <button
                        className="download-btn"
                        onClick={downloadPDF}
                    >
                        Download All Cards PDF
                    </button>
                )
            }

            {/* ID CARD */}

            {
                selectedStudent && (

                    <div
                        className="cards-container"
                        id="pdf-card"
                    >

                        {/* FRONT CARD */}

                        <div className="id-card">

                            <div className="card-header">

                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="college-logo"
                                />

                                <div className="college-name">

                                    ABC ENGINEERING
                                    <br />
                                    COLLEGE

                                </div>

                            </div>

                            <div className="profile-circle">

                                {
                                    images[
                                        String(selectedStudent.roll).trim()
                                    ] ? (

                                        <img
                                            src={
                                                images[
                                                String(selectedStudent.roll).trim()
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

                            <h2>
                                STUDENT ADDRESS
                            </h2>

                            <p>
                                {selectedStudent.address}
                            </p>

                            <div className="extra-details">

                                <p>
                                    <strong>Blood Group:</strong>
                                    {" "}
                                    {selectedStudent.blood}
                                </p>

                                <p>
                                    <strong>Mobile:</strong>
                                    {" "}
                                    {selectedStudent.mobile}
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

