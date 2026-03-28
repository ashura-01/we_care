const Groq = require("groq-sdk");
const doctorModel = require("../models/doctorModel");
const userModel = require("../models/userModel");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

exports.analyzeSymptoms = async (req, res) => {
  try {
    const { chatHistory } = req.body;

    if (!chatHistory || !Array.isArray(chatHistory) || chatHistory.length === 0) {
      return res.status(400).json({ success: false, message: "Chat history is required." });
    }

    // Fetch the logged-in user's name using the ID from the auth token
    const currentUser = await userModel.findById(req.user._id);
    const patientName = currentUser ? currentUser.name : "Patient";

    // Fetch doctors
    const doctors = await doctorModel.find({ verified: true }).populate("userId", "name");
    const doctorList = doctors.map(doc => {
        const docName = doc.userId ? doc.userId.name : "Unknown Doctor";
        return `- ${docName} (${doc.specialization}) at ${doc.hospital}`;
    }).join("\n");

    // Personalize the system prompt
    const systemMessage = {
      role: "system",
      content: `You are a helpful, empathetic medical triage AI for the 'WeCare' hospital app. 
      You are currently talking to a patient named ${patientName}. Greet them by their name.
      
      Here is the list of available doctors:
      ${doctorList}

      INSTRUCTIONS:
      1. If ${patientName}'s symptoms are vague, ask 1 brief follow-up question.
      2. Once you understand the issue, recommend the MOST APPROPRIATE doctor from the list and explain why.
      3. NEVER recommend a doctor that is not on the list.`
    };

    const messages = [systemMessage, ...chatHistory];

    const chatCompletion = await groq.chat.completions.create({
      messages: messages,
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
    });

    const aiResponse = chatCompletion.choices[0]?.message?.content || "Sorry, I couldn't generate a response.";

    res.status(200).json({
      success: true,
      reply: aiResponse 
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process chat",
      error: error.message
    });
  }
};