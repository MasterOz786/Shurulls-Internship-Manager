import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const generateProjectSuggestions = async (interneeSkills, interests) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `As a career advisor, suggest 3 suitable project ideas for an internee with the following skills and interests:
    Skills: ${interneeSkills.join(', ')}
    Interests: ${interests.join(', ')}
    
    For each project, provide:
    1. Project title
    2. Brief description
    3. Key learning outcomes
    4. Required technologies
    5. Estimated duration
    
    Format the response in a structured way.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const analyzePerformance = async (evaluations, reports, tasks) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Analyze the internee's performance based on the following data:
    
    Evaluations: ${JSON.stringify(evaluations)}
    Reports: ${JSON.stringify(reports)}
    Tasks: ${JSON.stringify(tasks)}
    
    Provide:
    1. Overall performance assessment
    2. Key strengths
    3. Areas for improvement
    4. Specific recommendations for growth
    5. Suggested learning resources
    
    Format the response in a clear, actionable format.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export const generateMeetingSummary = async (meetingTranscript) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const prompt = `Summarize the following meeting transcript and extract key points:
    
    ${meetingTranscript}
    
    Provide:
    1. Meeting summary
    2. Key decisions made
    3. Action items
    4. Follow-up tasks
    5. Timeline/deadlines mentioned
    
    Format the response in a structured way.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};