import React from "react";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import styles from "./About.module.css"; // Convert CSS to module

const About: React.FC = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.aboutHeader}>
        <h1>About</h1>
        <InfoOutlinedIcon style={{ fontSize: 48, color: "#333" }} />
      </div>
      <div className={styles.aboutContent}>
        {/* Accordions */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h6"
              style={{ fontSize: "14px", fontWeight: "600" }}
            >
              What is the purpose of SOS?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography style={{ fontSize: "12px" }}>
              The purpose of SOS is to provide a platform where individuals can
              seek truth, advocate for justice, and raise awareness about
              pressing social issues...
            </Typography>
          </AccordionDetails>
        </Accordion>
        {/* More accordions follow */}
      </div>
    </div>
  );
};

export default About;
