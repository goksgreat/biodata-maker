// Render Prop
import React, { useEffect, useState, useCallback } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Card1 from "./Card1";
import BiodataService from "../BiodataService";
import ListProfiles from './ListProfiles';

const FormFields = [
  {
    name: "SNo",
    label: "SNo",
    type: "text",
  },
  {
    name: "Name",
    label: "Name",
    type: "text",
  },
  {
    name: "Gotra",
    label: "Gotra",
    type: "text",
  },
  {
    name: "Caste",
    label: "Caste",
    type: "text",
  },
  {
    name: "POB",
    label: "P.O.B",
    type: "text",
  },
  {
    name: "DOB",
    label: "D.O.B",
    type: "date",
  },
  {
    name: "TOB",
    label: "T.O.B",
    type: "time",
  },
  {
    name: "Manglik",
    label: "Manglik",
    type: "text",
  },
  {
    name: "Height",
    label: "Height",
    type: "text",
  },
  {
    name: "Qualification",
    label: "Qualification",
    type: "text",
  },
  {
    name: "Occupation",
    label: "Occupation",
    type: "text",
  },
  {
    name: "Salary",
    label: "Salary",
    type: "text",
  },
  {
    name: "FamilyDetails",
    label: "Family Details",
    type: "text",
    fieldType: "textarea",
  },
  {
    name: "ContactDetails",
    label: "Contact Details",
    type: "number",
  },
  {
    name: "Image",
    label: "Image",
    type: "file",
  },
  {
    name: "Title",
    label: "Title",
    type: "text",
  },
  {
    name: "Subtitle",
    label: "Subtitle",
    type: "text",
  },
  {
    name: "borderColor",
    label: "Border Color",
    type: "color",
  },
  {
    name: "FooterSection",
    label: "Footer Section",
    type: "text",
    fieldType: "textarea",
  },
];

const Basic = () => {
  const [dataDb, setDataDb] = useState(null);
  const [mainConfig, setMainConfig] = useState(null);
  const getData = useCallback(async () => {
    const data = await BiodataService.getAll();
    const config = await BiodataService.getConfig();
    onDataChange(data);
    setMainConfig(config);
  }, []);

  const onDataChange = (querySnapshot) => {
    let dataItems = [];


    querySnapshot.forEach((doc) => {
      dataItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    setDataDb(dataItems);
  };


  useEffect(() => {
    getData();
  }, [getData]);

  return (
  <div>
    {dataDb && mainConfig &&
    <Formik
      initialValues={{ Name: "", Gotra: "", ...mainConfig }}
      validate={(values) => {
        const errors = {};
        // if (!values.email) {
        //   errors.email = "Required";
        // } else if (
        //   !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        // ) {
        //   errors.email = "Invalid email address";
        // }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting, values }) => (
        <div className="container-fluid">
          <div className="row">
              <Card1 data={values} />
            <div className="col-md-6 text-white">
              <Form>
                {FormFields.map((field) => (
                  <div className="form-group">
                    {field.name === 'Title' && <h2>App Configuration</h2>}
                    <Field
                      type={field.type}
                      name={field.name}
                      className="form-control"
                      placeholder={field.label}
                      as={field.fieldType}
                    />
                    <ErrorMessage name={field.name} component="div" />
                  </div>
                ))}
                {/* <button
                  type="submit"
                  className="btn text-white btn-lg"
                  style={{
                    backgroundColor: "#66DE93",
                    borderRadius: "50px",
                  }}
                  disabled={isSubmitting}
                >
                  Submit
                </button> */}
              </Form>
            </div>
          </div>
          <div className="pd-4 pb-4 d-block d-sm-none">
          <hr />
          <ListProfiles />
        </div>
        </div>
      )}
    </Formik>}
  </div>
)};

export default Basic;
