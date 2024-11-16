import { Button } from "@mui/material";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import {
  addWeeks,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  getMonth,
  getWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subWeeks,
} from "date-fns";

export default function TimelineChart() {
  const [viewRange, setViewRange] = useState({
    min: startOfMonth(new Date()).getTime(),
    max: endOfMonth(new Date()).getTime(),
  });
  const [currentView, setCurrentView] = useState("month");

  // function getAnnotations() {
  //   let annotations = [];
  //   if (currentView) {
  //     switch (currentView) {
  //       case "month":
  //         console.log("min", new Date(viewRange.min));
  //         annotations.push({
  //           x: viewRange.min,
  //           x2: viewRange.max,
  //           label: {
  //             text: format(new Date(viewRange.min), "LLLL"),
  //             style: {
  //               background: "#e3f2fd",
  //               color: "#0d47a1",
  //               fontWeight: 700,
  //             },
  //           },
  //         });
  //         break;
  //       case "two-week":
  //         annotations.push(
  //           {
  //             x: viewRange.min,
  //             x2: subWeeks(new Date(viewRange.max), 1).getTime(),
  //             label: {
  //               text: `Week ${getWeek(new Date(viewRange.min))}`,
  //               style: {
  //                 background: "#e3f2fd",
  //                 color: "#0d47a1",
  //                 fontWeight: 700,
  //               },
  //             },
  //           },
  //           {
  //             x: addWeeks(new Date(viewRange.min), 1).getTime(),
  //             x2: viewRange.max,
  //             label: {
  //               text: `Week ${getWeek(new Date(viewRange.max))}`,
  //               style: {
  //                 background: "#e3f2fd",
  //                 color: "#0d47a1",
  //                 fontWeight: 700,
  //               },
  //             },
  //           }
  //         );
  //         break;
  //       case "one-week":
  //         annotations.push({
  //           x: viewRange.min,
  //           x2: viewRange.max,
  //           label: {
  //             text: `Week ${getWeek(new Date(viewRange.min))}`,
  //             style: {
  //               background: "#e3f2fd",
  //               color: "#0d47a1",
  //               fontWeight: 700,
  //             },
  //           },
  //         });
  //         break;
  //       case "one-day":
  //         annotations.push({
  //           x: viewRange.min,
  //           x2: viewRange.max,
  //           label: {
  //             text: `${format(new Date(viewRange.min), "PPP")}`,
  //             style: {
  //               background: "#e3f2fd",
  //               color: "#0d47a1",
  //               fontWeight: 700,
  //             },
  //           },
  //         });
  //         break;
  //       case "two-day":
  //         annotations.push(
  //           {
  //             x: viewRange.min,
  //             x2: endOfDay(new Date(viewRange.min)).getTime(),
  //             label: {
  //               text: `${format(new Date(viewRange.min), "PPP")}`,
  //               style: {
  //                 background: "#e3f2fd",
  //                 color: "#0d47a1",
  //                 fontWeight: 700,
  //               },
  //             },
  //           },
  //           {
  //             x: startOfDay(new Date(viewRange.max)).getTime(),
  //             x2: viewRange.max,
  //             label: {
  //               text: `${format(new Date(viewRange.min), "PPP")}`,
  //               style: {
  //                 background: "#e3f2fd",
  //                 color: "#0d47a1",
  //                 fontWeight: 700,
  //               },
  //             },
  //           }
  //         );
  //         break;

  //       default:
  //         break;
  //     }
  //   }
  //   return annotations;
  // }

  const options = {
    chart: {
      height: 450,
      type: "rangeBar",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 570,
      },
      stacked: false,
      zoom: {
        zoom: {
          enabled: true,
          type: "x",
          resetIcon: {
            offsetX: -10,
            offsetY: 0,
            fillColor: "#fff",
            strokeColor: "#37474F",
          },
          selection: {
            background: "#90CAF9",
            border: "#0D47A1",
          },
        },
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: "80%",
      },
    },
    xaxis: {
      tickPlacement: "between",
      type: "datetime",
      min: viewRange.min,
      max: viewRange.max,
      position: "top",
      labels: {
        // rotate: -27,
        // rotateAlways: true,
        // offsetY: -30,
        // formatter: function (val) {
        //   const date = format(new Date(val), "PP");
        //   return date;
        // },
        tickPlacement: "on",
      },
    },
    stroke: {
      width: 1,
    },
    fill: {
      type: "solid",
      opacity: 0.6,
    },
    legend: {
      show: true,
      position: "bottom",
    },
    noData: {
      text: "No data to show.",
      align: "center",
      verticalAlign: "middle",
    },
    grid: {
      show: true,
      borderColor: "#90A4AE",
      strokeDashArray: 0,
      position: "back",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      column: {
        colors: ["#D3D3D3", "#ffffff"],
        opacity: 0.5,
      },
    },
    // annotations: {
    //   xaxis: getAnnotations() ?? [],
    // },
  };

  const series = [
    {
      name: "Bob",
      data: [
        {
          x: "Design",
          y: [
            new Date("2024-09-01").getTime(), // Recent (present) date
            new Date("2024-09-05").getTime(),
          ],
        },
        {
          x: "Code",
          y: [
            new Date("2024-07-15").getTime(), // Past (2 months ago)
            new Date("2024-07-18").getTime(),
          ],
        },
        {
          x: "Code",
          y: [
            new Date("2024-08-20").getTime(), // Recent (present) date
            new Date("2024-08-25").getTime(),
          ],
        },
        {
          x: "Test",
          y: [
            new Date("2024-07-10").getTime(), // Past (2 months ago)
            new Date("2024-08-05").getTime(),
          ],
        },
        {
          x: "Test",
          y: [
            new Date("2024-09-01").getTime(), // Recent (present) date
            new Date("2024-09-10").getTime(),
          ],
        },
        {
          x: "Validation",
          y: [
            new Date("2024-09-15").getTime(), // Recent (present) date
            new Date("2024-09-20").getTime(),
          ],
        },
        {
          x: "Design",
          y: [
            new Date("2024-05-01").getTime(), // Past (2 months ago)
            new Date("2024-05-03").getTime(),
          ],
        },
        {
          x: "Deployment",
          y: [
            new Date("2024-12-01").getTime(), // Future (3 months ahead)
            new Date("2024-12-05").getTime(),
          ],
        },
      ],
    },
    {
      name: "Joe",
      data: [
        {
          x: "Design",
          y: [
            new Date("2024-09-12").getTime(), // Recent (present) date
            new Date("2024-09-15").getTime(),
          ],
        },
        {
          x: "Test",
          y: [
            new Date("2024-08-25").getTime(), // Recent (present) date
            new Date("2024-09-10").getTime(),
          ],
          goals: [
            {
              name: "Break",
              value: new Date("2024-09-01").getTime(),
              strokeColor: "#CD2F2A",
            },
          ],
        },
        {
          x: "Code",
          y: [
            new Date("2024-08-18").getTime(), // Recent (present) date
            new Date("2024-08-22").getTime(),
          ],
        },
        {
          x: "Deployment",
          y: [
            new Date("2024-12-01").getTime(), // Future (3 months ahead)
            new Date("2024-12-03").getTime(),
          ],
        },
        {
          x: "Design",
          y: [
            new Date("2024-09-05").getTime(), // Recent (present) date
            new Date("2024-09-12").getTime(),
          ],
        },
      ],
    },
    {
      name: "Dan",
      data: [
        {
          x: "Code",
          y: [
            new Date("2024-08-20").getTime(), // Recent (present) date
            new Date("2024-08-27").getTime(),
          ],
        },
        {
          x: "Validation",
          y: [
            new Date("2024-07-30").getTime(), // Past (2 months ago)
            new Date("2024-08-02").getTime(),
          ],
          goals: [
            {
              name: "Break",
              value: new Date("2024-08-01").getTime(),
              strokeColor: "#CD2F2A",
            },
          ],
        },
        {
          x: "Design",
          y: [
            new Date("2024-05-10").getTime(), // Past (2 months ago)
            new Date("2024-05-15").getTime(),
          ],
        },
        {
          x: "Validation",
          y: [
            new Date("2024-09-10").getTime(), // Recent (present) date
            new Date("2024-09-14").getTime(),
          ],
          goals: [
            {
              name: "Break",
              value: new Date("2024-09-12").getTime(),
              strokeColor: "#CD2F2A",
            },
          ],
        },
        {
          x: "Deployment",
          y: [
            new Date("2024-12-10").getTime(), // Future (3 months ahead)
            new Date("2024-12-12").getTime(),
          ],
        },
      ],
    },
  ];

  const handleViewChange = (viewName) => {
    const now = new Date();
    switch (viewName) {
      case "month":
        setViewRange({
          min: startOfMonth(now).getTime(),
          max: endOfMonth(now).getTime(),
        });
        setCurrentView("month");
        break;
      case "1-week":
        setViewRange({
          min: startOfWeek(now).getTime(),
          max: endOfWeek(now).getTime(),
        });
        setCurrentView("one-week");
        break;
      case "2-week":
        setViewRange({
          min: startOfWeek(subWeeks(now, 1)).getTime(),
          max: endOfWeek(now).getTime(),
        });
        setCurrentView("two-week");
        break;
      case "2-day":
        setViewRange({
          min: subDays(now, 1).getTime(),
          max: endOfDay(now).getTime(),
        });
        setCurrentView("two-day");
        break;
      case "1-day":
        setViewRange({
          min: startOfDay(now).getTime(),
          max: endOfDay(now).getTime(),
        });
        setCurrentView("one-day");
        break;

      default:
        break;
    }
  };

  function getTitle() {
    let title = "";
    if (currentView) {
      switch (currentView) {
        case "month":
          title = format(new Date(viewRange.min), "PP");
          break;
        case "two-week":
          title =
            format(new Date(viewRange.min), "PP") +
            " - " +
            format(new Date(viewRange.max), "PP");
          break;
        case "one-week":
          title =
            format(new Date(viewRange.min), "PP") +
            " - " +
            format(new Date(viewRange.max), "PP");
          break;
        case "two-day":
          title =
            format(new Date(viewRange.min), "PP") +
            " - " +
            format(new Date(viewRange.max), "PP");
          break;
        case "one-day":
          title = format(new Date(viewRange.min), "PP");
          break;
        default:
          break;
      }
    }
    return title;
  }

  return (
    <div style={{ margin: "0px 20px" }}>
      <div className="controls">
        <div>
          <Button variant="outlined">Today</Button>
          <Button variant="outlined">{"<"}</Button>
          <Button variant="outlined">{">"}</Button>
        </div>
        <div>
          <Button
            variant={currentView === "one-day" && "outlined"}
            onClick={() => handleViewChange("1-day")}
          >
            1 Day
          </Button>
          <Button
            variant={currentView === "two-day" && "outlined"}
            onClick={() => handleViewChange("2-day")}
          >
            2 Day
          </Button>
          <Button
            variant={currentView === "one-week" && "outlined"}
            onClick={() => handleViewChange("1-week")}
          >
            1 Week
          </Button>
          <Button
            variant={currentView === "two-week" && "outlined"}
            onClick={() => handleViewChange("2-week")}
          >
            2 Week
          </Button>
          <Button
            variant={currentView === "month" && "outlined"}
            onClick={() => handleViewChange("month")}
          >
            Month
          </Button>
        </div>
      </div>
      <h2 style={{ marginBottom: "30px" }}>{getTitle()}</h2>
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
