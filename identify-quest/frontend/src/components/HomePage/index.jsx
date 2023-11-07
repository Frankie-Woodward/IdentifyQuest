import Sketch from "../SketchAi"

export default function HomePage(props) {
  return (
    <>
      <h1>Welcome to Identify Quest</h1>
      <Sketch suspectDetails={props.suspectDetails} />
    </>
  )
}
