import { useRef, useState } from "react";
import './styles.css'
import OpenAI from "openai";
import Herme from '../Assets/Herme.JPG'


export default function Sketch() {
    const [image_url, setImage_url] = useState("/");
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        alert("Please provide details about the suspect.");
        if (inputRef.current.value==="") {
            return 0;
        }
        setLoading(true);
        const detectivePrompt = `You are a detective. You will be given details of a suspect. Your job is to use these details to sketch an image of the suspect and provide a real life image. Details: ${inputRef.current.value}`;
        const response = await fetch('https://api.openai.com/v1/images/generations',
        {
            method: "POST",
            headers:{
                "Content-Type":"application/json",
                Authorization: 
                "Bearer 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",
                "User-Agent": "Chrome",
            },
            body:JSON.stringify({
                prompt:detectivePrompt,
                n:1,
                size:"512x512",
            }),
        }
        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);
    }
    return (
        <>
        <div className='ai-detective'>
            <div className="header">Ai image <span>generator</span></div>
            <div className="img-loading">
                <div className="image"><img src={image_url==="/"?Herme:image_url }></img></div>
                <div className="loading">
                    <div className={loading?"loading-bar-full":"loading-bar"}></div>
                    <div className={loading?"loading-text":"display-none"}>Loading....</div>
                </div>
            </div>
            <div className="search-box">
                <input type="text" ref={inputRef} className="search-input" placeholder='Describe the suspect in great detail'/>
                <div className="generate-btn" onClick={()=>{imageGenerator()}}>Identify</div>
            </div>
            </div>
        </>
    )
}