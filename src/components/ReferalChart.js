import { BarChart } from "@mui/x-charts/BarChart";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";

export default function ReferalChart() {
  const [referalsList, setReferalsList] = useState([]);

  useEffect(() => {
    var referals = [];
    db.collection(`/admins/${auth?.currentUser?.uid}/referals`)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var referalData = {
            id: doc.id,
            name: doc.data().name,
          };

          db.collection(
            `/admins/${auth?.currentUser?.uid}/referals/${doc.id}/clients`
          )
            .get()
            .then((querySnapshot) => {
              referalData.value = querySnapshot.size;
              referals.push(referalData);
              setReferalsList(referals);
            });
        });
      });
  }, [setReferalsList]);

  return (
    <div>
      <h1>sdffds</h1>
      {/* <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: referalsList?.map((referal) => referal?.name.split(" ")[0]),
          },
        ]}
        series={[
          {
            type: "bar",
            data: referalsList?.map((referal) => referal?.value),
          },
        ]}
        width={700}
        height={300}
        sx={{
          //change left yAxis label styles
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "#fff",
          },
          // change all labels fontFamily shown on both xAxis and yAxis
          "& .MuiChartsAxis-tickContainer .MuiChartsAxis-tickLabel": {
            fontFamily: "Roboto",
          },
          // change bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.5",
            fill: "#fff",
          },
          // bottomAxis Line Styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "#fff",
            strokeWidth: 1,
          },
          // leftAxis Line Styles
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "#fff",
            strokeWidth: 1,
          },
        }}
      /> */}
    </div>
  );
}
