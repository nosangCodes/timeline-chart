import { Button, ButtonGroup } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";
import useNavigateView from "../hooks/use-navigate-view";

export default function TimelineChart() {
  const { getTitle, handleViewChange, navigate, options, series, currentView } =
    useNavigateView();

  return (
    <div style={{ margin: "15px 20px" }}>
      <div className="controls">
        <div>
          <Button
            size="small"
            onClick={() => navigate("today")}
            variant="outlined"
          >
            Today
          </Button>
          <Button
            size="small"
            onClick={() => navigate("prev")}
            variant="outlined"
          >
            {"<"}
          </Button>
          <Button
            size="small"
            onClick={() => navigate("next")}
            variant="outlined"
          >
            {">"}
          </Button>
        </div>
        <ButtonGroup size="small">
          <Button
            variant={currentView !== "one-day" ? "outlined" : "contained"}
            onClick={() => handleViewChange("1-day")}
          >
            1 Day
          </Button>
          <Button
            variant={currentView !== "two-day" ? "outlined" : "contained"}
            onClick={() => handleViewChange("2-day")}
          >
            2 Day
          </Button>
          <Button
            variant={currentView !== "one-week" ? "outlined" : "contained"}
            onClick={() => handleViewChange("1-week")}
          >
            1 Week
          </Button>
          <Button
            variant={currentView !== "two-week" ? "outlined" : "contained"}
            onClick={() => handleViewChange("2-week")}
          >
            2 Week
          </Button>
          <Button
            variant={currentView !== "month" ? "outlined" : "contained"}
            onClick={() => handleViewChange("month")}
          >
            Month
          </Button>
        </ButtonGroup>
      </div>
      <h2 style={{ marginBottom: "10px", color: "#1976d2" }}>{getTitle()}</h2>
      <div>
        <ReactApexChart
          series={series}
          options={options}
          type="rangeBar"
          height={600}
        />
      </div>
    </div>
  );
}
