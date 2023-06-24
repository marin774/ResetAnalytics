import { Col, Row } from "react-bootstrap"
import { BarChart, Tooltip, Bar, XAxis, Pie, PieChart, Cell, Legend, YAxis, ResponsiveContainer } from "recharts"
import { colourList } from "../../public/helpers/frontend"
import { msToStr } from "../../public/helpers/frontendConverters"

const EntryTypeGraph = ({ data }) => {
  const barChartData = []
  for (const enterType in data.et) {
    const v = data.et[enterType].sum / data.et[enterType].total
    barChartData.push({
      name: enterType,
      avg: v,
      label: msToStr(v)
    })
  }

  const pieChartData = []
  for (const enterType in data.et) {
    pieChartData.push({
      name: enterType,
      percOfTotal: data.et[enterType].total
    })
  }

  const biomeBarChartData = []
  for (const biomeType in data.bt) {
    const v = data.bt[biomeType].sum / data.bt[biomeType].total
    biomeBarChartData.push({
      name: biomeType,
      avg: v,
      label: msToStr(v)
    })
  }

  const biomePieChartData = []
  for (const biomeType in data.bt) {
    biomePieChartData.push({
      name: biomeType,
      percOfTotal: data.bt[biomeType].total
    })
  }

  return (
    <>
      <div style={{ width: "100%", height: "300px", display: "flex" }}>
        <div style={{ flex: 1, width: "50%", display: "flex", flexDirection: "column" }}>

          <h1 style={{ flex: 0 }}>Enter Type Average</h1>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer>
              <BarChart data={barChartData}>
                <XAxis dataKey="name" stroke="#b2b2b2" />
                <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
                <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
                <Bar dataKey="avg" fill="#ffffff">
                  {barChartData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={colourList[idx]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ flex: 1, width: "50%", display: "flex", flexDirection: "column" }}>

          <h1 style={{ flex: 0 }}>Enter Type Percentage</h1>
          <div style={{ flex: 1 }}>

            <ResponsiveContainer>
              <PieChart className="mx-auto">
                <Pie
                  dataKey="percOfTotal"
                  isAnimationActive={true}
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#00d0ff"
                >
                  {pieChartData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={colourList[idx]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="right" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div style={{ width: "100%", height: "300px", display: "flex" }}>

        <div style={{ flex: 1, width: "50%", display: "flex", flexDirection: "column" }}>

          <h1 style={{ flex: 0 }}>Biome Enter Average</h1>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer>
              <BarChart width={500} height={250} data={biomeBarChartData}>
                <XAxis dataKey="name" stroke="#b2b2b2" />
                <YAxis tickFormatter={tick => msToStr(tick)} stroke="#b2b2b2" />
                <Tooltip separator="" formatter={value => [msToStr(value), ""]} cursor={false} itemStyle={{ color: "#000000" }} labelStyle={{ color: "#000000" }} />
                <Bar dataKey="avg" fill="#ffffff">
                  {biomeBarChartData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div style={{ flex: 1, width: "50%", display: "flex", flexDirection: "column" }}>


          <h1 style={{ flex: 0 }}>Biome Enter Percentage</h1>
          <div style={{ flex: 1 }}>
            <ResponsiveContainer>
              <PieChart width={300} height={250} className="mx-auto">
                <Pie
                  dataKey="percOfTotal"
                  isAnimationActive={true}
                  data={biomePieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  fill="#00d0ff"
                >
                  {biomePieChartData.map((_, idx) => (
                    <Cell key={`cell-${idx}`} fill={colourList[(idx + 2) % 4]} />
                  ))}
                </Pie>
                <Legend layout="horizontal" verticalAlign="bottom" align="right" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </>
  )
}

export default EntryTypeGraph