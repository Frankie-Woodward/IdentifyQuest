import SketchAi from "../SketchAi"
import './styles.css'


export default function HomePage(props) {
  return (
    <>
    
      <SketchAi suspectDetails={props.suspectDetails} />
    </>
  )
}
