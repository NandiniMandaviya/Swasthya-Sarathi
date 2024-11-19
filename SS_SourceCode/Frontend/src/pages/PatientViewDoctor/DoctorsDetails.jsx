import React from "react";
import SidePanel from "../components/SidePanel";
import DoctorImg from '../../assets/images/doctor-img01.png';
import "./DoctorsDetails.css";

const DoctorDetails = () => {
    return (
        <section className="docdetp-doctor-details">
            <div className="docdetp-doctor-details__container">
                <div className="docdetp-doctor-details__grid">
                    <div className="docdetp-doctor-details__main">
                        <div className="docdetp-doctor-details__header">
                            <figure className="docdetp-doctor-details__image">
                                <img src={DoctorImg} alt="Doctor profile" />
                            </figure>

                            <div className="docdetp-doctor-details__info">
                                <span className="docdetp-doctor-details__specialty">
                                    Surgeon
                                </span>
                                <h3 className="docdetp-doctor-details__name">Doctor Name</h3>
                                <p className="docdetp-doctor-details__description">
                                    A brief description of the doctor should go here.
                                </p>
                            </div>
                        </div>

                        {/* Commented Navigation Section
                        <div className="doctor-details__nav">
                            <button className="doctor-details__nav-button">About</button>
                        </div>
                        */}
                    </div>
                    <div className="docdetp-doctor-details__sidebar">
                        <SidePanel />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DoctorDetails;