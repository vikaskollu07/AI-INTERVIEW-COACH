
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, InterviewFeedback, ResumeCritique, TailoredResumeSuggestion, AssessmentQuestion, LearningResource } from '../types';

const getGenAI = () => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export async function generateInterviewQuestions(profile: UserProfile): Promise<string[]> {
  const ai = getGenAI();
  const prompt = `You are an expert interviewer for a ${profile.experienceLevel} ${profile.jobTitle} in the ${profile.industry} industry. 
  Generate 5 relevant ${profile.interviewType} interview questions for this role. 
  Return them as a JSON array of strings.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
        },
      },
    });
    
    const questions = JSON.parse(response.text);
    if (Array.isArray(questions) && questions.every(q => typeof q === 'string')) {
      return questions;
    }
    throw new Error("Invalid question format received from API.");
  } catch (error) {
    console.error("Error generating questions:", error);
    // Fallback questions
    return [
      "Tell me about a challenging project you worked on.",
      "How do you handle disagreements with team members?",
      "Describe a time you had to learn a new technology quickly.",
      `What are the core concepts of ${profile.jobTitle.split(' ')[0]} that you find most important?`,
      "Where do you see yourself in 5 years?",
    ];
  }
}

export async function evaluateAnswer(question: string, answer: string): Promise<InterviewFeedback['feedback']> {
  const ai = getGenAI();
  const prompt = `As an AI career coach, provide a detailed evaluation of this interview answer.
Question: "${question}"
Answer: "${answer}"

Analyze the answer based on the following criteria and provide a score from 1 to 10 for each:
1.  **STAR Structure**: How well the answer follows the Situation, Task, Action, Result format.
2.  **Content Quality**: The relevance, depth, and substance of the answer.
3.  **Clarity**: How clear and easy to understand the language is.
4.  **Confidence**: How confident and authoritative the answer sounds.

Also, provide 2-3 bullet points for 'Strengths' (what the user did well) and 2-3 bullet points for 'Areas for Improvement' (actionable suggestions).

IMPORTANT PRIVACY NOTE: Do not repeat or store any personally identifiable information (PII) found in the answer, such as names, addresses, phone numbers, social security numbers, or financial details. Your analysis should focus only on the structure and quality of the response.

Return a JSON object with keys: "starScore" (number), "contentScore" (number), "clarityScore" (number), "confidenceScore" (number), "strengths" (array of strings), and "improvements" (array of strings).`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            starScore: { type: Type.NUMBER },
            contentScore: { type: Type.NUMBER },
            clarityScore: { type: Type.NUMBER },
            confidenceScore: { type: Type.NUMBER },
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            improvements: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
          },
          required: ["starScore", "contentScore", "clarityScore", "confidenceScore", "strengths", "improvements"],
        },
      },
    });
    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error evaluating answer:", error);
    return {
        starScore: 5,
        contentScore: 5,
        clarityScore: 5,
        confidenceScore: 5,
        strengths: ["Completed the answer."],
        improvements: ["There was an issue processing detailed feedback. Please try again."],
    }
  }
}

export async function generatePassLikelihood(overallScore: number): Promise<{ likelihood: number, rationale: string }> {
    const ai = getGenAI();
    const prompt = `An interview candidate received an overall score of ${overallScore.toFixed(1)} out of 10.
    Based on this score, estimate the pass likelihood as a percentage (from 0 to 100).
    Also provide a brief, one-sentence rationale for this estimate.
    
    Return a JSON object with keys: "likelihood" (number) and "rationale" (string).`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        likelihood: { type: Type.NUMBER },
                        rationale: { type: Type.STRING },
                    },
                    required: ["likelihood", "rationale"]
                }
            }
        });
        return JSON.parse(response.text);
    } catch(e) {
        console.error("Error generating pass likelihood", e);
        const likelihood = Math.max(0, Math.min(100, Math.round(overallScore * 10)));
        return {
            likelihood,
            rationale: "This is a solid score, showing good potential for success."
        }
    }
}

export async function generateExampleAnswer(question: string, profile: UserProfile): Promise<string> {
    const ai = getGenAI();
    const prompt = `You are an expert ${profile.experienceLevel} ${profile.jobTitle} in the ${profile.industry} industry. 
    Provide an ideal, high-quality sample answer to the following interview question: "${question}".
    Structure the answer clearly, using the STAR method if it's a behavioral question. The answer should be concise yet comprehensive.
    Return only the text of the answer as a single string.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error("Error generating example answer:", error);
        return "Sorry, I couldn't generate an example answer at this time. Please try again later.";
    }
}


export async function critiqueResume(resumeText: string, targetRole: string): Promise<ResumeCritique> {
  const ai = getGenAI();
  const prompt = `You are an expert resume reviewer and career coach.
Resume Text: "${resumeText}"
Target Role: "${targetRole}"

Critique the resume focusing on:
1. Missing keywords relevant for the target role.
2. Lack of quantification or measurable results.
3. General formatting and clarity issues.

Return a JSON object with keys: "missingKeywords" (array of strings), "quantificationFeedback" (string), and "formattingFeedback" (string).`;
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
            type: Type.OBJECT,
            properties: {
                missingKeywords: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                },
                quantificationFeedback: { type: Type.STRING },
                formattingFeedback: { type: Type.STRING }
            },
            required: ["missingKeywords", "quantificationFeedback", "formattingFeedback"]
        }
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
      console.error("Error critiquing resume:", error);
      return {
          missingKeywords: ["Error processing keywords."],
          quantificationFeedback: "Could not analyze quantification.",
          formattingFeedback: "Could not analyze formatting."
      }
  }
}

export async function tailorResumeForATS(resumeText: string, jobDescription: string): Promise<TailoredResumeSuggestion> {
    const ai = getGenAI();
    const prompt = `You are an expert career coach specializing in optimizing resumes for Applicant Tracking Systems (ATS).
    Rewrite the following resume to be perfectly tailored for the provided job description. 
    Focus on incorporating relevant keywords, phrasing accomplishments to match the job's requirements, and ensuring a clear, parsable format.
    
    Resume Text: "${resumeText}"
    
    Job Description: "${jobDescription}"

    Return a JSON object with two keys: "tailoredResume" (the full text of the rewritten resume as a single string, using newline characters for formatting) and "explanation" (a brief, user-friendly summary of the key changes you made and why they are important for ATS compatibility and recruiter appeal).`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tailoredResume: { type: Type.STRING },
                        explanation: { type: Type.STRING }
                    },
                    required: ["tailoredResume", "explanation"]
                }
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error tailoring resume:", error);
        return {
            tailoredResume: "There was an error generating the tailored resume. Please try again.",
            explanation: "Could not generate an explanation due to an error."
        }
    }
}

export async function generateAssessmentQuestion(skill: string): Promise<AssessmentQuestion> {
    const ai = getGenAI();
    const prompt = `You are an expert in creating skill assessments. Generate one multiple-choice question to test a candidate's ${skill}. 
    The question should be practical and relevant for a job interview context.
    
    Return a JSON object with keys: "question" (string), "options" (an array of 4 strings), "correctOptionIndex" (number, 0-3), and "explanation" (a brief string explaining why the correct answer is right).`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        question: { type: Type.STRING },
                        options: { type: Type.ARRAY, items: { type: Type.STRING } },
                        correctOptionIndex: { type: Type.NUMBER },
                        explanation: { type: Type.STRING },
                    },
                    required: ["question", "options", "correctOptionIndex", "explanation"]
                }
            }
        });
        const result = JSON.parse(response.text);
        // Basic validation
        if (result.options.length === 4) {
            return result;
        }
        throw new Error("API returned incorrect number of options.");
    } catch (error) {
        console.error("Error generating assessment question:", error);
        // Fallback question
        return {
            question: "Which of the following is NOT a core principle of Object-Oriented Programming?",
            options: ["Encapsulation", "Inheritance", "Polymorphism", "Compilation"],
            correctOptionIndex: 3,
            explanation: "Compilation is the process of converting source code into machine code; it is not a principle of OOP. The other three are core concepts of OOP."
        };
    }
}

export async function generateLearningPath(goal: string): Promise<LearningResource[]> {
    const ai = getGenAI();
    const prompt = `You are an expert career coach. A user wants to achieve the following goal: "${goal}".
    
    Generate a concise, actionable learning path with 3-5 items to help them achieve this.
    Each item should be a 'Course', 'Article', or 'Practice' project.
    
    Return a JSON array of objects, where each object has keys: "type" ('Course', 'Article', or 'Practice'), "title" (string), and "description" (a one-sentence string).`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            title: { type: Type.STRING },
                            description: { type: Type.STRING },
                        },
                        required: ["type", "title", "description"]
                    }
                }
            }
        });
        return JSON.parse(response.text);
    } catch (error) {
        console.error("Error generating learning path:", error);
        return [{
            type: "Article",
            title: "Getting Started with Your Goal",
            description: "An error occurred generating your path. Start by searching for introductory articles on your topic."
        }];
    }
}
