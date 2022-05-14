import React, { useCallback, useState, useEffect } from "react";
import BiodataService from "../BiodataService";
import DataTable from "./Datatable";
import styled, { keyframes } from 'styled-components';

const ListProfiles = (props) => {
  const [dataDb, setDataDb] = useState(null);
//   const [mainConfig, setMainConfig] = useState(null);
  const getData = useCallback(async () => {
    const data = await BiodataService.getAll();
    // const config = await BiodataService.getConfig();
    onDataChange(data);
    // setMainConfig(config);
  }, []);

  const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
	margin: 16px;
	animation: ${rotate360} 1s linear infinite;
	transform: translateZ(0);
	border-top: 2px solid grey;
	border-right: 2px solid grey;
	border-bottom: 2px solid grey;
	border-left: 4px solid black;
	background: transparent;
	width: 80px;
	height: 80px;
	border-radius: 50%;
`;

const CustomLoader = () => (
	<div style={{ padding: '24px' }}>
		<Spinner />
	</div>
);

  const onDataChange = async (querySnapshot) => {
    let dataItems = [];

    querySnapshot.forEach((doc) => {
      dataItems.push({
        id: doc.id,
        ...doc.data(),
      });
    });

    for (const item of dataItems) {
      const img = await BiodataService.getImg(item.id);
      item.downloadUrl = img;
    }
    setDataDb(dataItems);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  const columns = [
    {
      name: "SNo.",
      selector: (row) => row.SNo,
    },
    {
      name: "Name",
      selector: (row) => row.Name,
    },
    {
      name: "Gotra",
      selector: (row) => row.Gotra,
    },
    {
      name: "DOB",
      selector: (row) => row.DOB,
    },
    {
      name: "TOB",
      selector: (row) => row.TOB,
    },
    {
      name: "",
      button: true,
      cell: (row) => (
        <a href={row.downloadUrl} target="_blank" rel="noopener noreferrer">
          Download
        </a>
      ),
    },
  ];

  if (!dataDb) return <div className="d-flex justify-content-center"><CustomLoader /></div>;
  return <DataTable dataCol={dataDb} columns={columns} />;
};

export default ListProfiles;
