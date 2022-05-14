import React, { useCallback } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import differenceBy from "lodash/differenceBy";
import { Button } from "react-bootstrap";
import BiodataService from "../BiodataService";

const excludeFields = [
  "FamilyDetails",
  "ContactDetails",
  "Image",
  "FooterSection",
  "borderColor",
  "Title",
  "Subtitle",
  "SNo",
];

export function ManageSelections({ dataCol, columns }) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const [data, setData] = React.useState(dataCol);

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  const convertArrayOfObjectsToCSV = useCallback(
    (array) => {
      let result;

      const columnDelimiter = ",";
      const lineDelimiter = "\n";
      const keys = Object.keys(data[0]);

      result = "";
      result += keys
        .filter((el) => !excludeFields.includes(el))
        .join(columnDelimiter);
      result += lineDelimiter;

      array.forEach((item) => {
        let ctr = 0;
        keys
          .filter((el) => !excludeFields.includes(el))
          .forEach((key) => {
            if (ctr > 0) result += columnDelimiter;

            result += item[key];

            ctr++;
          });
        result += lineDelimiter;
      });

      return result;
    },
    [data]
  );

  // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
  const downloadCSV = useCallback(
    (array) => {
      const link = document.createElement("a");
      let csv = convertArrayOfObjectsToCSV(array);
      if (csv == null) return;

      const filename = "export.csv";

      if (!csv.match(/^data:text\/csv/i)) {
        csv = `data:text/csv;charset=utf-8,${csv}`;
      }

      link.setAttribute("href", encodeURI(csv));
      link.setAttribute("download", filename);
      link.click();
    },
    [convertArrayOfObjectsToCSV]
  );

  const Export = ({ onExport }) => (
    <Button onClick={(e) => onExport(e.target.value)}>Export</Button>
  );

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      if (
        window.confirm(
          `Are you sure you want to delete profiles of:\r ${selectedRows.map(
            (r) => r.Name
          )}?`
        )
      ) {
        selectedRows.forEach((row) => {
          BiodataService.remove(row.id);
        });
        setToggleCleared(!toggleCleared);
        setData(differenceBy(data, selectedRows, "SNo"));
      }
    };

    const createPDF = async () => {
      const paramsArr = [];
      selectedRows.forEach((row) => {
        paramsArr.push({ URL: row.downloadUrl });
      });
      axios
        .post(
          `https://v2.convertapi.com/convert/images/to/pdf?Secret=WeNd28AKeZiz1r6y`,
          {
            Parameters: [
              {
                Name: "Files",
                FileValues: paramsArr,
              },
              {
                Name: "StoreFile",
                Value: true,
              },
            ],
          }
        )
        .then((res) => {
          console.log(res);
          console.log(res.data);
        });
    };

    return (
      <>
        <Button
          key="delete"
          className="btn btn-sm ml-4"
          onClick={handleDelete}
          style={{ backgroundColor: "red" }}
          icon
        >
          Delete
        </Button>
        <Button
          key="createPDF"
          className="btn btn-sm ml-4"
          onClick={createPDF}
          style={{ backgroundColor: "blue" }}
          icon
        >
          PDF
        </Button>
      </>
    );
  }, [data, selectedRows, toggleCleared]);

  const actionsMemo = React.useMemo(
    () => <Export onExport={() => downloadCSV(data)} />,
    [data, downloadCSV]
  );

  return (
    <DataTable
      title="List of Profiles:"
      columns={columns}
      data={data}
      selectableRows
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected}
      clearSelectedRows={toggleCleared}
      actions={actionsMemo}
      pagination
    />
  );
}

export default ManageSelections;
