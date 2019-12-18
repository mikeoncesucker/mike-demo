import React from "react";
import { Chart, Geom, Label, View } from "bizcharts";
import DataSet from "@antv/data-set";

export interface RelationChartProps {
  list: any;
  intl: any;
}
class RelationChart extends React.Component<RelationChartProps, any> {
  constructor(props: Readonly<RelationChartProps>) {
    super(props);
    this.state = {};
  }
  render() {
    const { list } = this.props;
    const nodes = list.map((item: any) => { return { name: item } });
    const relationData: any = {
      nodes,
      links: [
        { source: 1, target: 0, value: 110 },
        { source: 2, target: 0, value: 180 },
        { source: 0, target: 3, value: 100 },
        { source: 0, target: 4, value: 150 },
        { source: 0, target: 5, value: 200 }
      ]
    };
    const ds = new DataSet();
    const dv = ds.createView().source(relationData, {
      type: "graph",
      edges: (d: any) => d.links
    });
    dv.transform({
      type: "diagram.sankey"
    });
    const scale = {
      x: {
        sync: true
      },
      y: {
        sync: true
      }
    };
    return (
      <Chart
        forceFit={true}
        height={window.innerHeight}
        scale={scale}
        padding={["-130", "85"]}
      >
        <View data={dv.edges}>
          <Geom
            type="edge"
            position="x*y"
            shape="arc"
            color="#182E7B"
            opacity={0.48}
          />
        </View>
        <View data={dv.nodes}>
          <Geom
            type="polygon"
            position="x*y"
            color="name"
            style={{
              stroke: "#ccc"
            }}
          >
            <Label
              content="name"
              htmlTemplate={(text, item, index)=>{
                // text 为每条记录 x 属性的值
                return `<span class="title" style="display: inline-block;width: 160px; color: #CCCDE0; font-weight: 500; font-size: 18px; text-align: center ">${text}</span>;`
              }}
              offset={0}
            />
          </Geom>
        </View>
      </Chart>
    );
  }
}
export default RelationChart;
