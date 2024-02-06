import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from "@mui/icons-material/Remove";
import "./App.css";

const options = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const App = () => {
  const [open, setOpen] = useState(false);
  const [segmentName, setSegmentName] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [addedSchemas, setAddedSchemas] = useState([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleAddSchema = () => {
    if (selectedOption) {
      setAddedSchemas((prevSchemas) => [...prevSchemas, selectedOption]);
      setSelectedOption(null);
    }
  };

  const handleSchemaChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleRemoveSchema = (index) => {
    setAddedSchemas((prevSchemas) => {
      const updatedSchemas = [...prevSchemas];
      updatedSchemas.splice(index, 1);
      return updatedSchemas;
    });
  };

  const handleSaveSegment = () => {
    console.log("Segment saved:", { segmentName, addedSchemas });
    handleClose();
  };

  const handleClose = () => {
    setSegmentName("");
    setAddedSchemas([]);
    setSelectedOption("");
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Save Segment
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogContent>
          <Typography variant="h6" component="h2">
            Saving Segment
          </Typography>
          <Typography variant="h6" component="h5" fontSize={15} my={2}>
            Enter the Name of the Segment
          </Typography>
          <TextField
            // label="Name of the Segment"
            placeholder="Name of the Segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Typography variant="h6" component="h5" fontSize={15}>
            To save your segment, add the schemas to build the query
          </Typography>
          <div className="Traits_group">
            <Typography
              fontSize={10}
              fontWeight={600}
              my={1.5}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{ color: "green", fontSize: "20px", margin: "0px 3px" }}
              >
                ●
              </span>{" "}
              - User Traits
            </Typography>
            <Typography
              fontSize={10}
              fontWeight={600}
              my={1.5}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <span
                style={{ color: "red", fontSize: "20px", margin: "0px 3px" }}
              >
                ●
              </span>{" "}
              - Group Traits
            </Typography>
          </div>

          {addedSchemas.length > 0 && (
            <Grid
              container
              className="option_container"
              spacing={2}
              style={{ marginTop: "10px" }}
            >
              {addedSchemas.map((schema, index) => (
                <Grid item key={schema.value} xs={12}>
                  <div className="Added_schema">
                    <span
                      style={{
                        color:
                          schema.value === "first_name" ||
                          schema.value === "last_name" ||
                          schema.value === "gender" ||
                          schema.value === "age"
                            ? "green"
                            : "red",
                      }}
                    >
                      ●
                    </span>
                    <TextField
                      select
                      // label={schema.label}
                      value={schema.value}
                      onChange={() => {}}
                      sx={{ width: "80%", mx: 1 }}
                    >
                      <MenuItem value={schema.value}>{schema.label}</MenuItem>
                    </TextField>
                    <IconButton
                      size="small"
                      onClick={() => handleRemoveSchema(index)}
                      style={{ marginLeft: "10px", color: "#87CEEB" }}
                    >
                      <RemoveIcon />
                    </IconButton>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}

          <div className="Addschema">
            <span
              style={{
                color: "grey",
              }}
            >
              ●
            </span>
            <TextField
              select
              label="Add schema to segment"
              // placeholder="Add schema to segment"
              value={selectedOption}
              onChange={handleSchemaChange}
              sx={{ width: "80%", mx: 1 }}
              displayEmpty
              size="medium"
              margin="normal"
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <IconButton
              size="small"
              style={{ marginLeft: "10px", color: "#87CEEB" }}
            >
              <RemoveIcon />
            </IconButton>
          </div>

          <Link
            component="button"
            onClick={handleAddSchema}
            style={{ margin: "15px 10px" }}
          >
            +Add new schema
          </Link>
          <div className="btn_container">
            <Button
              onClick={handleSaveSegment}
              sx={{
                textTransform: "none",
                color: "#fff",
                background: "#5A9196",
                margin: 2,
                width: "auto",
                "&:hover": { background: "#5A9196" },
              }}
            >
              Save the segment
            </Button>
            <Button
              onClick={handleClose}
              sx={{
                textTransform: "none",
                color: "red",
                background: "white",
                margin: 2,
                width: "auto",
                "&:hover": { background: "#fff" },
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default App;
