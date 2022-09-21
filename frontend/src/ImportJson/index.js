import trJson from '../Assets/trial.json'
const ImportJson = () => {
    console.log("clb ",trJson.name)
    const frame = trJson.MetaInfo.records[0].records[0].records.keypoints
    let startPoint = {x:0, y:0}
    frame.map(part =>{
        const bodyPart = ATTRIBUTE_TYPES.filter(({Name}) => part.bodyPart.toLowerCase().indexOf(Name.toLowerCase()) > -1)[0]
        point.push({id :point.length, element: 
            <Circle
            id = {point.length+""}
            key={point.length+1}
            x={part.x/4}
            y={part.y/4}
            width={12}
            height={12}
            fill={"green"}
            draggable
            />})
        if(part.bodyPart.indexOf("left") >= 0){
            startPoint.x = part.x
            startPoint.y = part.y
        }
        else if(part.bodyPart.indexOf("right") >= 0){
            console.log("right ",lines)
            lines.push({first_point_id: point.length-2, startPosition:{x:startPoint.x/4, y:startPoint.y/4}, endPosition:{x:part.x/4, y:part.y/4} ,element: 
            <Line
                points={[startPoint.x/4, startPoint.y/4, part.x/4, part.y/4]}
                stroke={bodyPart.Color}
                strokeWidth={4}
                tension={0.2}
                lineCap="round"
            ></Line>})
        }
    })
}
export default ImportJson;
/*

/*
const setJson = () =>{
  const frame = trJson.MetaInfo.records[0].records[0].records.keypoints
  let startPoint = {x:0, y:0}
  frame.map(part =>{
      const bodyPart = ATTRIBUTE_TYPES.filter(({Name}) => part.bodyPart.toLowerCase().indexOf(Name.toLowerCase()) > -1)[0]
      point.push({id :point.length, element: 
        <Circle
          id = {point.length+""}
          key={point.length+1}
          x={part.x/4}
          y={part.y/4}
          width={12}
          height={12}
          fill={"green"}
          draggable
        />})
      if(part.bodyPart.indexOf("left") >= 0){
        startPoint.x = part.x
        startPoint.y = part.y
      }
      else if(part.bodyPart.indexOf("right") >= 0){
        console.log("right ",lines)
        lines.push({first_point_id: point.length-2, startPosition:{x:startPoint.x/4, y:startPoint.y/4}, endPosition:{x:part.x/4, y:part.y/4} ,element: 
          <Line
            points={[startPoint.x/4, startPoint.y/4, part.x/4, part.y/4]}
            stroke={bodyPart.Color}
            strokeWidth={4}
            tension={0.2}
            lineCap="round"
          ></Line>})
      }
  })
}

*/