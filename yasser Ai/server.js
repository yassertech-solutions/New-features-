import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const API_KEY = process.env.OPENAI_API_KEY;

app.post("/chat", async (req, res) => {
    try {
        const userMessage = req.body.message;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-4.1-mini",
                messages: [
                    { role: "system", content: "Wewe ni AI wa Yasser Tech unafundisha tech, elimu na mafanikio." },
                    { role: "user", content: userMessage }
                ]
            })
        });

        const data = await response.json();

        res.json({
            reply: data.choices?.[0]?.message?.content || "Samahani, kuna tatizo."
        });

    } catch (err) {
        res.json({ reply: "Server error imetokea." });
    }
});

app.listen(3000, () => console.log("🚀 Server running http://localhost:3000"));
