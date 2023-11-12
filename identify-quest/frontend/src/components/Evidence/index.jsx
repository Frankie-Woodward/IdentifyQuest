export default function Evidence({ imageUrl, suspectDetails }) {
    return (
      <>
        <div className="evidence-details-page">
          {imageUrl && <img src={imageUrl} alt="Suspect Sketch" />}
          <p>
            {suspectDetails}
          </p>
        </div>
      </>
    )
  }
  