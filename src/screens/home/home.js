import { useGlobalContext } from "../../context/context";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./home.css";
import React from "react";
import axios from "axios";

export const Home = () => {
  const { context, setURL } = useGlobalContext();
  const [isValid, setIsValid] = React.useState(false);
  const [url, setUrl] = React.useState("");
  const [shortedUrl, setShortedUrl] = React.useState("");
  const [copyText, setCopyText] = React.useState("Copy");

  const handleChangeUrl = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
  };

  const shortUrl = async () => {
    //const url = context.url;
    const urlRegex =
      /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (urlRegex.test(url)) {
      setIsValid(false);

      const response = await axios.get(
        ` https://api.shrtco.de/v2/shorten?url=${url}`
      );
      if (response.data.ok) {
        setShortedUrl(response.data.result.full_short_link);
        setURL(...context.urls, { url, shortedUrl });

        localStorage.setItem("urls", JSON.stringify(context.urls));
      }
    } else {
      setIsValid(true);
    }
  };

  return (
    <div>
      <div className="main-div">
        <p style={{ color: "black" }}>More than just a shorter links</p>

        <div className="url-div">
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "58ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <div style={{ display: "flex" }}>
              <TextField
                error={isValid}
                id="outlined-error"
                label=""
                placeholder="url"
                value={url}
                onChange={handleChangeUrl}
              />
              <Button
                sx={{
                  width: "25ch",
                  height: "7ch",
                  marginTop: "1ch",
                  marginLeft: "1ch",
                }}
                variant="contained"
                onClick={shortUrl}
              >
                Short
              </Button>
            </div>
          </Box>
        </div>

        {shortedUrl !== "" && (
          <div>
            <p style={{ color: "black" }}>Success</p>{" "}
            <div className="url-div">
              <p style={{ color: "black" }}>{url}</p>
              <p style={{ color: "black" }}>{shortedUrl}</p>
              <Button
                sx={{
                  width: "25ch",
                  height: "7ch",
                  marginTop: "1ch",
                  marginLeft: "1ch",
                }}
                variant="contained"
                onClick={() => {
                  navigator.clipboard.writeText(shortedUrl);
                }}
              >
                {copyText}
              </Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
