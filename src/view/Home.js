import { Grid } from "@mui/material";
import React, { useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useMediaQuery from "@mui/material/useMediaQuery";
import bImage from "../assets/b.jpg";
import rImage from "../assets/r.jpg";
import dImage from "../assets/d.jpg";
import mImage from "../assets/m.jpg";

const Home = () => {
  const initialState = {
    Image: mImage,
    content: "asdad",
  };
  const windowWidth = useMediaQuery("(min-width:600px)");
  const states = ["Mumbai", "Rajasthan", "Delhi", "Bangalore"];
  const [value, setValue] = useState("Mumbai");
  const [content, setContent] = useState(initialState);

  const handleChange = (event) => {
    let tempValue = event.target.value;
    setValue(tempValue);
    if (tempValue === "Mumbai") {
      setContent({ Image: mImage, content: "asdad" });
    } else if (tempValue === "Rajasthan") {
      setContent({ Image: rImage, content: "asdad" });
    } else if (tempValue === "Bangalore") {
      setContent({ Image: bImage, content: "asdad" });
    } else if (tempValue === "Delhi") {
      setContent({ Image: dImage, content: "asdad" });
    }
  };

  return (
    <div style={{ height: "100vh", display: "flex" }}>
      <div
        style={{
          width: "50%",
          display: "flex",
          alignContent: "space-around",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Grid alignItems="center" justifyContent="center" container>
          <Grid xs={12} item>
            Please Select a state
          </Grid>
          <Grid xs={windowWidth ? 6 : 10} item>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">State</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label="State"
                onChange={handleChange}
              >
                {states.map((state) => (
                  <MenuItem value={state}>{state}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </div>
      <div
        style={{
          backgroundImage: `url(${content.Image})`,
          width: "50%",
          backgroundSize: "cover",
          WebkitTransition: "background 1s",
          MozTransition: "background 1s",
          OTransition: "background 1s",
          transition: "background 1s",
        }}
      >
        <Grid alignItems="center" justifyContent="center" container>
          <Grid
            alignItems="center"
            justifyContent="center"
            style={{ display: "flex" }}
            xs={12}
            item
          >
            <h1
              style={{
                color: "rgb(212 212 212 / 50%)",
                fontFamily: "-webkit-pictograph",
                fontSize: windowWidth ? "65px" : "35px",
                fontWeight: "normal",
              }}
            >
              {value}
            </h1>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Home;
