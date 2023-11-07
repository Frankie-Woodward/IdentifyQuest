import { useRef, useState, useEffect } from "react";
import './styles.css'
import Herme from '../Assets/Herme.JPG'


export default function SketchAi({ onImageURLChange, suspectDetails }) {
    const [image_url, setImage_url] = useState(Herme);
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (suspectDetails) {
        console.log('Setting image URL from onImageURLChange');
        setImage_url(onImageURLChange);
        console.log('New image URL:', onImageURLChange);
      }
  }, [onImageURLChange]); 

    const imageGenerator = async (details) => {
        try {
            if (!details && !inputRef.current.value) {
                alert("Here is a sketch of the suspect based on your description");
                return;
            }
            setLoading(true);
            const detailText = details || inputRef.current.value;
            const detectivePrompt = `You are a detective. You will be given details of a suspect. Your job is to use these details to sketch an image of the suspect and provide a real life image. Details: ${detailText}`;
            
            const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
            
            const description = await fetch('https://api.openai.com/v1/images/generations', {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${OPENAI_API_KEY}`,
                },
                body: JSON.stringify({
                prompt: detectivePrompt,
                n: 1,
                size: "1024x1024",
                }),
            });
        if (!description.ok) {
                // If the response is not ok, throw an error with the status
                throw new Error(`HTTP error! status: ${description.status}`);
            }

        const data = await description.json();
        console.log('Fetched image data:', data);
        if (data && data.data && data.data.length > 0) {
          setImage_url(data.data[0].url); // Update the state directly
          console.log('New image URL after fetch:', data.data[0].url);

      } else {
          throw new Error('No image data received.');
      }
  } catch (error) {
      alert('Error generating image: ' + error.message);
  } finally {
      setLoading(false);
  }
};
    return (
        <>
        <div className='ai-detective'>
            <div className="header"> Sus<span>pect </span>Sketch</div>
            <div className="img-loading">
                <div className="image"><img src={image_url ? image_url : Herme} alt="Suspect" /></div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading....</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className="search-input" placeholder='Describe the suspect in great detail'/>
                <div className="generate-btn" onClick={() => imageGenerator(inputRef.current.value)}>Identify</div>
            </div>
            </div>
        </>
    )
}