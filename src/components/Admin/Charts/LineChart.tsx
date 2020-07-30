import { ResponseModel, PageModel } from "../../../models";
import { VictoryChart, VictoryLabel, VictoryLine, VictoryAxis, createContainer } from "victory";
import { emotionToNumeric } from "./ChartUtils";

const getRelevant = (response: ResponseModel, responses: ResponseModel[]) =>
    responses.filter(r => new Date(r.created_at).getDate() <= new Date(response.created_at).getDate());

//TODO: this should be done in an SQL query backend 
const sumEmotions = (responses: ResponseModel[]) => responses
    .map(({ emotion }) => emotionToNumeric(emotion))
    .reduce((a, b) => a + b)

const isLast = (element: any, array: any[]) =>
    array.indexOf(element) === (array.length - 1)

const toDateCoordinates = (page: PageModel, response: ResponseModel, responses: ResponseModel[]) => {

    const relevant = getRelevant(response, responses);
    const sum = sumEmotions(relevant);
    const average = sum / relevant.length;

    console.log("is last: ", isLast(response, responses), "in ", page.name);
    return {
        y: average,
        x: new Date(response.created_at),
        label: isLast(response, responses) ?
            page.name : null
    }
}


export const LineChart = ({ pageInformations }) => <VictoryChart
    domainPadding={{ y: 10 }}
    domain={{ y: [0, 2] }}
>
    <VictoryAxis
        dependentAxis
        tickValues={[0, 1, 2]}
        tickFormat={tick => [":-(", ":-|", ":-)"][tick]} //TODO: Proper emoji
    />
    {pageInformations.map(({ page, responses }) => {
        return (
            <VictoryLine
                name={`line_${page.id}`}
                style={{
                    data: { stroke: "cyan", strokeWidth: 5 } //TODO: page.color
                }}
                data={responses
                    .map(response => toDateCoordinates(page, response, responses))}
                labelComponent={<VictoryLabel dx={10} dy={15} renderInPortal />}
            />
        );
    })}
</VictoryChart>


/**
 *
 * import React from "react";
import ReactDOM from "react-dom";
import {
  VictoryChart,
  VictoryLabel,
  VictoryLine,
  createContainer,
  VictoryAxis
} from "victory";
import { uniqueId } from "./utils";

import "./styles.css";

const data = [
  [
    { company: "A", quarter: 1, earnings: 0.1 },
    { company: "A", quarter: 2, earnings: 0.2 },
    { company: "A", quarter: 3, earnings: 0.3 },
    { company: "A", quarter: 4, earnings: 0.4, label: "A" }
  ],
  [
    { company: "B", quarter: 1, earnings: 0.2 },
    { company: "B", quarter: 2, earnings: 0.3 },
    { company: "B", quarter: 3, earnings: 0.4 },
    { company: "B", quarter: 4, earnings: 0.5, label: "B" }
  ],
  [
    { company: "C", quarter: 1, earnings: 0.3 },
    { company: "C", quarter: 2, earnings: 0.4 },
    { company: "C", quarter: 3, earnings: 0.5 },
    { company: "C", quarter: 4, earnings: 0.6, label: "C" }
  ],
  [
    { company: "D", quarter: 1, earnings: 0.4 },
    { company: "D", quarter: 2, earnings: 0.5 },
    { company: "D", quarter: 3, earnings: 0.6 },
    { company: "D", quarter: 4, earnings: 0.7, label: "D" }
  ]
];

const colors = ["red", "blue", "purple", "green"];

const VictoryZoomVoronoiContainer = createContainer("zoom", "voronoi");

function App() {
  return (
    <VictoryChart
      domainPadding={{ y: 10 }}
      padding={{
        top: 50,
        bottom: 50,
        left: 50,
        right: 100
      }}
      domain={{ x: [1, 4], y: [0, 1] }}
      containerComponent={
        <VictoryZoomVoronoiContainer />
        // include the line below in the container tag if you want to show tooltips at each point
        // labels={d => `(x=${d.quarter};y=${d.earnings})`}
      }
    >
      <VictoryAxis tickValues={[1, 2, 3, 4]} />
      <VictoryAxis
        dependentAxis
        tickValues={[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]}
        tickFormat={t => `${t * 100}%`}
      />
      {data.map((dataArray, key) => {
        return (
          <VictoryLine
            key={`line_${uniqueId()}`}
            name={`line_${key}`}
            style={{
              data: { stroke: colors[key], strokeWidth: 5 }
            }}
            data={dataArray}
            x="quarter"
            y="earnings"
            labels={d => d.label}
            labelComponent={<VictoryLabel dx={10} dy={15} renderInPortal />}
          />
        );
      })}
    </VictoryChart>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

 */