import React, { createRef, useEffect, useState } from "react";
// import Pdf from "react-to-pdf";
import { useScreenshot, createFileName } from "use-react-screenshot";
import BiodataService from "../BiodataService";
import ListProfiles from './ListProfiles';

const Card1 = (props) => {
  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot();
  const [profilePic, setProfilePic] = useState(false);
  const download = async (image, { name = "img", extension = "png" } = {}, SNo) => {
    const uploadImg = await BiodataService.uploadAndDownload(image, SNo);
    console.log(`uploadImg`, uploadImg);
    const a = document.createElement("a");
    a.href = uploadImg || image;
    a.target = '_blank';
    a.download = createFileName(extension, name);
    a.click();
  };

//   const options = {
//     // orientation: 'portra',
//     unit: 'px',
//     format: [420,640]
// };

  const getImage = () => {
    takeScreenShot(ref.current);
    saveBiodata();
  };

  const {
    data: {
      Title,
      Subtitle,
      FamilyDetails,
      ContactDetails,
      Image,
      borderColor,
      FooterSection,
      SNo,
    } = {},
    data = {},
  } = props;
  const excludeFields = [
    "FamilyDetails",
    "ContactDetails",
    "Image",
    "FooterSection",
    "borderColor",
    "Title",
    "Subtitle",
    "SNo"
  ];

  useEffect(() => {
    if (image && SNo) {
      download(image, { name: "biodata", extension: "png" }, SNo);
    }
  }, [image, SNo]);

  const saveBiodata = () => {
    BiodataService.create(data);
  };

  useEffect(() => {
    if (Image) {
      const image =
        document.querySelector('input[type="file"]') &&
        document.querySelector('input[type="file"]').files[0];
      if (image) setProfilePic(image);
    }
  }, [Image]);

  const headerBg = {};
  const cardbg = {};
  if (borderColor) headerBg.background = borderColor;
  if (borderColor) cardbg.borderColor = borderColor;
  // headerBg.backgroundImage = `url('https://images.unsplash.com/photo-1549068106-b024baf5062d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80')`;
  return (
    <>
    <div className="col-md-6 pd0">
    <div id="poster" ref={ref}>
      <div className="card" data-state="#about" style={cardbg}>
        <div className="card-header" style={headerBg}>
          <div className="sno">#{SNo}</div>
          {/* <div className="card-cover" style={headerBg}></div> */}
          {/* <img
            className="card-avatar"
            src="https://i.pinimg.com/280x280_RS/d9/3b/4c/d93b4c5b8e9c9f362b04d25f17a899e8.jpg"
            alt="avatar"
          /> */}
          <img className="card-avatar"
          src="data:image/jpeg;base64,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Zjm6oD2sJK31NT+NBXlQbvbGjg1tarBF2VNu/eiikGwscs3WnNjOKaMOXc/bd6eKCKaBlRUQlEAUmFQgv969taIMl/cX3aXUdw+y7/rUmGw35P1ppSVSYabSpkKxM1o8WLPOAyPZ5w0rPQ2almSdkq+xG4nTH3mmWPMkvmfFXQe5+pUe5Ah4l8U+QX+jm/bVEBESwCpPlVfu/b1jMDaG/wAmucms9WA6TzrWhmZ3XP8AaowmJO098edApkxe/Jc/XagcWb7HF7j7h9nq54wW2UnwaEQRkc6x5xgjn0oAQRwThZeJn7r29KHajv1B1jrUor+xifFaw5Djz1/wWjfjkaUSK4z0X5OVHcjlDWT3ioftlcBhsU1vh3d9RIvcBapotGIUlbXmruVW/QogMGR9bJ+4pVnGPHZbPfH/ADABAQcSiLDEAnD2mNFpG3phcBR83KZmaTBMhFURe2lQbN3pg/skf5gRyjrkM9rUyEmI1tLaBvWCPOPq0zk2xZnqub4MqAzmVxLVwdYmiDiEkoU54OnAmgNPRv8APsbVkrbv0RVvwJlTBNpzTgVNCzZhEO9EUAchPmjKJcMpYFAAAFgP9TeRYoHmGR9aOXRyE+KywLH2/wD5P//aAAwDAQACAAMAAAAQ88888x88888888888888CW5978888888sFwyOT3uG88888879NXvPGV888888898sYrDB4z48888u/By98PdEqYc8888U1X6Z8r+Yl/888cu9Efk8i8ou1888/VctUdjuJ2bM888+O9ouGc7Gco888889WuR1csxDl8888884cvqWqe9888888888Z26W988888888888cbJ888888888888888888888//EACkRAQABAgQFBAMBAQAAAAAAAAERACExQVFhcYGhsfAgkdHhEDDB8UD/2gAIAQMBAT8Q9IQUq9sv3pgJq4E9+FF+ODK9LFK2EZSk96RKxKQncaw/oUhhnwpTZnf+uVATznzjfcorVsfCZ4WN693Vz/vUpF5V3An+VFDsQdTLq3pEBC0ufCoUapruf31kzVdL/wApErFpJ3pI+OCVsW9MqiWSYJqONLDC4mIedau3II84jrTu1twcPwkY+oUZPw0j1Kymh2oJQZ1Y6yHvQMTxZXngWahLDceOI+aUMbAC57Pm5SEvNNqUpnhwrD0YYq0KtJpn91dC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" alt="" />
          <div className="card-container">
            <h1 className="card-fullname">{Title}</h1>
            <p className="card-jobtitle">{Subtitle}</p>
          </div>
        </div>
        <div className="card-main">
          <div className="card-section is-active pb0" id="about">
            <div className="card-content pb0">
              {data &&
                Object.keys(data)
                  .filter((el) => !excludeFields.includes(el))
                  .map((field) => (
                    <div className="card-desc">
                      {field} : {field === 'Name' ? <strong>{data[field]}</strong> : data[field]}
                    </div>
                  ))}
              {FamilyDetails && (
                <div className="card-subtitle" style={{ marginTop: "8px" }}>
                  Family Details
                </div>
              )}
              </div>
              {profilePic && <div className="image-section pb0">
              <img
                className="card-avatar"
                src={`${
                  profilePic
                    ? URL.createObjectURL(profilePic)
                    : "https://i.pinimg.com/280x280_RS/d9/3b/4c/d93b4c5b8e9c9f362b04d25f17a899e8.jpg"
                }`}
                alt="avatar"
              />
            </div>}
            </div>
            <div className="card-section is-active pt0" id="about">
            <div className="card-content pt0">
              {FamilyDetails &&
                FamilyDetails.split("\n").map((text) => (
                  <p className="card-desc">{text}</p>
                ))}
              {ContactDetails && (
                <div className="card-desc" style={{ marginTop: "10px" }}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewbox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    style={{
                      height: "24px",
                      width: "34px",
                      marginRight: "10px",
                      borderRight: "1px solid",
                    }}
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  &nbsp;{ContactDetails}
                </div>
              )}
            </div>
            
          </div>
          <div className="card-buttons">
            <button
              className="is-active"
              style={{ borderColor: `${borderColor || "#8a84ff"}` }}
            >
              {FooterSection
                ? FooterSection.split(`\n`).map((el) => <p>{el}</p>)
                : "Om Namah Shivay"}
            </button>
          </div>
        </div>
        </div>
      </div>
      <div className="d-flex flex-direction-col">
        {/* <Pdf targetRef={ref} filename="myPoster.pdf" options={options} scale={2}>
          {({ toPdf }) => (
            <button
              className="btn text-white btn-lg mgt"
              style={{
                backgroundColor: "#66DE93",
                borderRadius: "50px",
              }}
              onClick={toPdf}
            >
              Save & Download PDF
            </button>
          )}
        </Pdf> */}
        <button
          className="btn text-white btn-lg mgt"
          style={{
            backgroundColor: "#66DE93",
            borderRadius: "50px",
          }}
          onClick={getImage}
        >
          Save & Download
        </button>
        </div>
        <div className="pd-4 pb-4 d-none d-sm-block">
          <hr />
          <ListProfiles />
        </div>
      </div>
    </>
  );
};

export default Card1;
