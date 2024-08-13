/* eslint-disable react/no-unescaped-entities */
import about from "../assets/about.png";
import '../Components/CSS/Style.css';

const About = () => {
  return (
    <>
      <div className="about-content">
        <img
          src={about}
          alt=""
          style={{ width: "70rem", height: "25rem", borderRadius: "10%" }}
        />
        <div>
          <h1 className="text-5xl font-bold  text-purple-700 mb-4 hover:text-white">
            About Us
          </h1>
          <p className="text-white text-justify confidential">
            Data confidentiality is about protecting data against unintentional,
            unlawful, or unauthorized access, disclosure, or theft.
            Confidentiality has to do with the privacy of information, including
            authorizations to view, share, and use it. Information with low
            confidentiality concerns may be considered "public" or otherwise not
            threatening if exposed beyond its intended audience. Information
            with high confidentiality concerns is considered secret and must be
            kept confidential to prevent identity theft, compromise of accounts
            and systems, legal or reputational damage, and other severe
            consequences.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
