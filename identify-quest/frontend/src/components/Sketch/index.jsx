export default function Sketch({ imageUrl }) {
    return (
      <>
        <div className="sketch-details-page">
          {imageUrl && <img src={imageUrl} alt="Suspect Sketch" />}
        </div>
      </>
    )
  }
  