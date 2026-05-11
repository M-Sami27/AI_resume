const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const pdfParse = require("pdf-parse");

const upload = multer({ storage: multer.memoryStorage() });

// 📁 HISTORY PATH
const historyPath = path.join(__dirname, "../data/history.json");

router.post("/upload", upload.single("resume"), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        // 📄 EXTRACT TEXT FROM PDF
        const data = await pdfParse(req.file.buffer);
        const text = data.text;

        if (!text || text.trim().length === 0) {
            return res.status(400).json({
                message: "Could not extract text from PDF"
            });
        }

        const lowerText = text.toLowerCase();

        // -----------------------------
        // 🧠 SMART FEATURE DETECTION
        // -----------------------------
        const hasProjects = lowerText.includes("project");
        const hasExperience = lowerText.includes("experience");
        const hasEducation = lowerText.includes("education");
        const hasSkills = lowerText.includes("skills");
        const hasGithub = lowerText.includes("github");
        const hasPortfolio = lowerText.includes("portfolio");

        const techKeywords = [
            "javascript", "python", "react", "node", "express",
            "mongodb", "sql", "machine learning", "ai",
            "docker", "html", "css"
        ];

        let keywordHits = 0;
        techKeywords.forEach((kw) => {
            if (lowerText.includes(kw)) keywordHits++;
        });

        const hasNumbers = /\d+/.test(text);
        const wordCount = text.split(/\s+/).length;

        // -----------------------------
        // 📊 BASE SCORE
        // -----------------------------
        let score = 50;

        // -----------------------------
        // 🎯 POSITIVE WEIGHTING
        // -----------------------------
        if (hasSkills) score += 10;
        if (hasProjects) score += 14;
        if (hasExperience) score += 12;
        if (hasEducation) score += 6;
        if (hasGithub) score += 5;
        if (hasPortfolio) score += 4;
        if (hasNumbers) score += 8;

        score += keywordHits * 2;

        // -----------------------------
        // 📉 PENALTIES
        // -----------------------------
        if (!hasProjects) score -= 12;
        if (!hasExperience) score -= 8;
        if (wordCount < 200) score -= 10;
        if (text.length < 800) score -= 8;

        // -----------------------------
        // 🎲 SMALL VARIATION (REALISTIC BEHAVIOR)
        // -----------------------------
        const variance = Math.floor(Math.random() * 5) - 2; // -2 to +2
        score += variance;

        // -----------------------------
        // 🔒 FINAL LIMITS
        // -----------------------------
        if (score > 92) score = 92;
        if (score < 35) score = 35;

        // -----------------------------
        // 🧠 DYNAMIC FEEDBACK ENGINE
        // -----------------------------
        const strengths = [];
        const weaknesses = [];
        const suggestions = [];

        if (hasProjects) strengths.push("Includes project experience");
        if (hasSkills) strengths.push("Has technical skills section");
        if (hasGithub) strengths.push("GitHub profile mentioned");
        if (hasNumbers) strengths.push("Uses measurable achievements");
        if (keywordHits > 3) strengths.push("Strong technical keyword presence");

        if (!hasProjects) weaknesses.push("Missing dedicated project section");
        if (!hasExperience) weaknesses.push("Limited or no work experience mentioned");
        if (wordCount < 200) weaknesses.push("Resume content is too short");

        if (!hasProjects) suggestions.push("Add 2–3 detailed projects with tech stack");
        if (!hasNumbers) suggestions.push("Add measurable results (e.g., 20% improvement)");
        if (!hasGithub) suggestions.push("Include GitHub or portfolio link");
        if (keywordHits < 3) suggestions.push("Add more relevant technical keywords");

        if (strengths.length === 0) strengths.push("Basic structure detected");

        // -----------------------------
        // 📊 RESULT TEXT
        // -----------------------------
        const result = `
Score: ${score}/100

🔥 Strengths:
${strengths.map(s => `- ${s}`).join("\n")}

⚠ Weaknesses:
${weaknesses.map(w => `- ${w}`).join("\n") || "- Minor issues detected"}

🚀 Suggestions:
${suggestions.map(s => `- ${s}`).join("\n") || "- Keep improving resume structure"}
        `;

        // -----------------------------
        // 👤 USER HANDLING
        // -----------------------------
        const user = req.body.user || "Guest User";

        // -----------------------------
        // 💾 HISTORY LOAD
        // -----------------------------
        let history = [];

        if (fs.existsSync(historyPath)) {
            history = JSON.parse(fs.readFileSync(historyPath, "utf-8"));
        }

        // -----------------------------
        // 🆕 NEW RECORD
        // -----------------------------
        const newRecord = {
            id: Date.now(),
            user: user.trim(),
            resumeName: req.file.originalname,
            score,
            result,
            createdAt: new Date().toISOString()
        };

        history.push(newRecord);

        // -----------------------------
        // 💾 SAVE HISTORY
        // -----------------------------
        fs.writeFileSync(historyPath, JSON.stringify(history, null, 2));

        // -----------------------------
        // 📤 RESPONSE
        // -----------------------------
        return res.json({
            message: "Resume analyzed successfully",
            score,
            result
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Error processing resume",
            error: err.message
        });
    }
});

module.exports = router;