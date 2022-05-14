import React, { useState } from 'react'
import img6 from "../images/img6.png"
import { Link } from 'react-router-dom'
import Card1 from './Card1';
const Page2 = () => {

    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [msg, setMsg] = useState("");
    const [image, setImage] = useState(null);
    const [borderColor, setBorderColor] = useState("")
    const handleName = (e) => {
        setName(e.target.value)
    }
    const handleSpecialization = (e) => {
        setSpecialization(e.target.value)
    }
    const handleColor = (e) => {
        setBorderColor(e.target.value)
        document.getElementById("posterCard").style.borderColor = e.target.value
    }
    const handleMsg = (e) => {
        setMsg(e.target.value)
    }
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-6" id="poster">
                <Card1 />
                    <div className="card" id="posterCard"
                        style={{
                            height: "55vh",
                            width: "37vh",
                            border: "10px solid",
                            borderColor: "red"
                        }}
                    >
                        <div className="text-center"
                            style={{
                                height: "21vh",
                                // borderBottom: "2px solid red"
                            }}
                        >
                            {image && <ImageThumb image={image} />}
                            {/* <img src={URL.createObjectURL(image)} alt="profilePhoto" style={{height:"20vh",width:"32vh"}} /> */}
                        </div>
                        <div className="text-center"
                            style={{
                                height: "9vh",
                                // borderBottom: "2px solid red"
                            }}
                        >
                            <h6>{name}</h6>
                            <h6>{specialization}</h6>
                        </div>
                        <div className="text-center"
                            style={{
                                height: "15vh",
                                // borderBottom: "2px solid red"
                            }}
                        >
                            {msg}
                        </div>
                        <div className="div">
                            <img src={img6} alt="" style={{ height: "7vh", width: "30vh" }} />
                        </div>
                    </div>
                </div>
                <div className="col-md-6 text-white">
                    <h5 className="text-center">Customize your Poster</h5><br />
                    <form>
                        <div className="form-group">
                            <input type="text" className="form-control" placeholder="Your Name" onChange={handleName} required />
                        </div>
                        <div className="form-group">
                            <select name="" id="" className="form-control" onChange={handleSpecialization} required>
                                <option value="" disabled selected hidden>Specialization</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="General">Consultant Physician</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Pick a Photo</label>
                            <input type="file" className="form-control" onChange={handleImage} required />
                        </div>
                        
                        <div className="form-group">
                            <label>Pick a Colour</label>
                            <input type="color" className="form-control" value="red" onChange={handleColor} required />
                        </div>
                        <div className="form-group">
                            <label>Your messege (0-100 character)</label>
                            <br />
                            <textarea name="" id="" cols="39" rows="5" onChange={handleMsg}></textarea>
                        </div>
                    </form>
                </div>
                <div className="container text-center p-3">
                    <Link to={{
                        pathname: "/print",
                        dataProps: {
                            name, specialization, msg, image, borderColor
                        }
                    }}

                    >

                        <div className="btn text-white btn-lg"
                            style={{
                                backgroundColor: "#66DE93",
                                borderRadius: "50px"
                            }}
                        >
                            Create Here
                    </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

const ImageThumb = ({ image }) => {
    return <img src={URL.createObjectURL(image)} alt={image.name} style={{ height: "20vh", width: "32vh", objectFit: "contain" }} />;
};
export default Page2;