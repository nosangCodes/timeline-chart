import {
  addDays,
  addMonths,
  endOfDay,
  endOfMonth,
  endOfWeek,
  format,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import React, { useCallback, useState } from "react";
import { formatData } from "../lib/format-data";

export default function useNavigateView() {
  const [viewRange, setViewRange] = useState({
    min: startOfMonth(new Date("2022-10-01")).getTime(),
    max: endOfMonth(new Date("2022-10-01")).getTime(),
  });
  const [currentView, setCurrentView] = useState("month");

  const options = {
    chart: {
      height: 700,
      type: "rangeBar",
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 570,
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
    },
    yaxis: {
      show: true,
      showAlways: false,
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
  };

  const series = formatData();

  const handleViewChange = useCallback((viewName) => {
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
  }, []);

  const getTitle = useCallback(() => {
    let title = "";
    if (currentView) {
      switch (currentView) {
        case "month":
          title = format(new Date(viewRange.min), "MMM y");
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
  }, [currentView, viewRange]);

  const navigate = useCallback(
    (name) => {
      const now = new Date();
      const intervalMapping = {
        "one-day": 1,
        "two-day": 2,
        "one-week": 7,
        "two-week": 14,
      };

      const adjustRange = (adjustFn, interval) => ({
        min: startOfDay(adjustFn(new Date(viewRange.min), interval)).getTime(),
        max: endOfDay(adjustFn(new Date(viewRange.max), interval)).getTime(),
      });

      if (name === "today") {
        setViewRange({
          min: startOfDay(now).getTime(),
          max: endOfDay(now).getTime(),
        });
        setCurrentView("one-day");
      } else if (name === "next" || name === "prev") {
        const adjustFn = name === "next" ? addDays : subDays;

        if (intervalMapping[currentView]) {
          const interval = intervalMapping[currentView];
          setViewRange(adjustRange(adjustFn, interval));
        } else if (currentView === "month") {
          const adjustFn = name === "next" ? addMonths : subMonths;
          setViewRange({
            min: startOfMonth(adjustFn(new Date(viewRange.min), 1)).getTime(),
            max: endOfMonth(adjustFn(new Date(viewRange.min), 1)).getTime(),
          });
        }
      }
    },
    [currentView, viewRange]
  );
  return {
    viewRange,
    options,
    series,
    handleViewChange,
    getTitle,
    navigate,
    currentView,
  };
}
