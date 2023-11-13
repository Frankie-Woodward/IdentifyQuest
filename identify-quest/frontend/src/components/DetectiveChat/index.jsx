import { useState, useRef } from "react"
import OpenAI from "openai";
import SketchAi from "../SketchAi";
import './styles.css'

export default function DetectiveChat({ onImageURLChange, onDetailsSubmit, userId }) {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const [suspectDetails, setSuspectDetails] = useState(null);

    const sendMessageToAi = async (message) => {
        try {
            const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
            const openai = new OpenAI({
                apiKey: OPENAI_API_KEY,
                dangerouslyAllowBrowser: true,
            })
            const response = await openai.chat.completions.create({
               
                model: "gpt-3.5-turbo",
                messages: [
                    {
                        role: "system",
                        content: "You are a detective. You will be given details of a suspect. Your job is to use these details to sketch an image of the suspect and provide a real life image. ",
                    },
                    {
                        role: "user",
                        content: message,
                    },
                ],
               
            });
    
            return response.choices[0].message.content;
        } catch (error) {
            console.error('Error calling OpenAI API:', error);
            return "I'm having trouble processing that. Could you try rephrasing?";
        }
    }; 
    const updateConversation = (message, fromAi = false) => {
        setMessages(prevMessages => [...prevMessages, {text: message, fromAi }])
    }

    const handleSubmit = async () => {
        if (input.trim() === '') return;
        updateConversation(input);
        setInput('');

        const aiResponse = await sendMessageToAi(input);
        updateConversation(aiResponse, true)

        console.log(aiResponse)

        if (aiResponse) {
            setSuspectDetails(aiResponse);
            onDetailsSubmit(aiResponse);
        } 
        setInput('');  
    }
    

    return(
        <div className="evidence">
            <SketchAi onImageURLChange={onImageURLChange} suspectDetails={suspectDetails} />
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.fromAI ? "ai-message" : "user-message"}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <textarea className="submit-box"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the suspect..."
            />
            <button className="submit-evidence" onClick={handleSubmit}>Submit Details</button>
        </div>
    )
}