import React, { useState, useContext } from "react";
import styles from "./Dashboard.module.css";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { AuthContext } from "../../utils/AuthContext";

const Dashboard = () => {

    const [fileName, setFileName] = useState("No file selected");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [file, setFile] = useState(null);

    const { userInfo } = useContext(AuthContext);

    const handleFile = (e) => {
        const selected = e.target.files[0];
        if (selected) {
            setFile(selected);
            setFileName(selected.name);
        }
    };

   const handleAnalyze = async () => {

    try {

        if (!file) {
            alert("Please upload a resume first");
            return;
        }

        setLoading(true);
        setResult(null);

        const formData = new FormData();

        // ✅ SAFE USER FETCH (FIXED)
        const user =
            JSON.parse(localStorage.getItem("user"));

        const username =
            user?.name || user?.username || "Guest User";

        console.log("Sending user:", username);

        formData.append("user", username);

        formData.append("resume", file);

        const res = await fetch(
            "http://localhost:4000/api/resume/upload",
            {
                method: "POST",
                body: formData,
            }
        );

        const data = await res.json();

        console.log("Resume response:", data);

        setResult({
            text: data.result,
        });

    } catch (err) {
        console.log(err);
        alert("Analysis failed");
    } finally {
        setLoading(false);
    }
};
    return (
        <div className={styles.container}>

            {/* LEFT */}
            <div className={styles.left}>

                <div className={styles.hero}>
                    <h1>AI Resume Analyzer</h1>
                    <p>Upload your resume and get instant AI feedback</p>
                </div>

                <div className={styles.uploadBox}>
                    <input
                        type="file"
                        accept=".pdf"
                        onChange={handleFile}
                    />
                    <p>{fileName}</p>
                </div>

                <button
                    className={styles.button}
                    onClick={handleAnalyze}
                >
                    <CreditScoreIcon />
                    Analyze Resume
                </button>

            </div>

            {/* RIGHT */}
            <div className={styles.right}>

                <div className={styles.profileCard}>
                    <img src={userInfo?.photoUrl} alt="user" />
                    <div>
                        <h3>{userInfo?.name || "User"}</h3>
                        <span>AI System</span>
                    </div>
                </div>

                {loading && (
                    <div className={styles.loadingBox}>
                        <div className={styles.loader}></div>
                        <Skeleton variant="rectangular" width="100%" height={120} />
                    </div>
                )}

                {result && !loading && (
                    <div className={styles.resultCard}>
                        <div className={styles.badge}>AI RESULT</div>
                        <pre className={styles.resultText}>
                            {result.text}
                        </pre>
                    </div>
                )}

                {!result && !loading && (
                    <div className={styles.empty}>
                        <h2>Ready for Analysis</h2>
                    </div>
                )}

            </div>

        </div>
    );
};

export default WithAuthHOC(Dashboard);