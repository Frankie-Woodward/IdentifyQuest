import './styles.css';

const AboutPage = () => {
    return (
        <div className="about-container">
            <h1 className="about-title">About Identify Quest</h1>
            <p className="about-content">
                Welcome to <strong>Identify Quest</strong>, the innovative application 
                that revolutionizes the way we approach public safety and crime-solving. 
                Our platform allows users to create AI-generated composite sketches 
                of individuals suspected of committing crimes. 
                These sketches can be saved and submitted directly to local 911 emergency teams, 
                assisting in timely and effective responses.
            </p>
            <p className="about-content">
                Utilizing state-of-the-art technology from OpenAI, Identify Quest employs 
                advanced image generation and chat completion tools. These tools empower 
                our users to generate detailed and accurate portrayals based on eyewitness 
                descriptions, enhancing the accuracy of crime investigation processes.
            </p>
            <p className="about-content">
                Our commitment to public safety and justice is unwavering. 
                Identify Quest is here to bridge the gap between technology and community well-being.
            </p>
        </div>
    );
};

export default AboutPage;
