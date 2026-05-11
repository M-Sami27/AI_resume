import React, { useState, useEffect, useContext } from "react";
import styles from "./History.module.css";
import Skeleton from "@mui/material/Skeleton";
import WithAuthHOC from "../../utils/HOC/withAuthHOC";
import { AuthContext } from "../../utils/AuthContext";

const History = () => {

    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(true);

    const { userInfo } = useContext(AuthContext);

    useEffect(() => {

        const user = JSON.parse(
            localStorage.getItem("user")
        );

        const username = user?.name || user?.username;

        if (!username) return;

        fetch(
            `http://localhost:4000/api/history/all/${username}`
        )
            .then(res => res.json())
            .then(result => {
                setData(result);
                setLoader(false);
            })
            .catch(err => {
                console.log(err);
                setLoader(false);
            });

    }, []);

    return (

        <div className={styles.History}>

            {/* HEADER */}
            <div className={styles.header}>

                <div>
                    <h1>Analysis History</h1>
                    <p>
                        Previous resumes of{" "}
                        <strong>{userInfo?.name}</strong>
                    </p>
                </div>

                <button
                    className={styles.backBtn}
                    onClick={() =>
                        window.location.href = "/dashboard"
                    }
                >
                    Back
                </button>

            </div>

            {/* CARDS */}
            <div className={styles.cardBlock}>

                {loader && (
                    <>
                        <Skeleton width={280} height={220} />
                        <Skeleton width={280} height={220} />
                        <Skeleton width={280} height={220} />
                    </>
                )}

                {!loader && data.length === 0 && (
                    <div className={styles.empty}>
                        <h2>No History Found</h2>
                    </div>
                )}

                {!loader && data.map((item) => (

                    <div key={item.id} className={styles.card}>

                        <div className={styles.scoreCircle}>
                            <span>{item.score}%</span>
                        </div>

                        <h3>{item.resumeName}</h3>

                        <pre className={styles.resultBox}>
                            {item.result}
                        </pre>

                        <span className={styles.date}>
                            {new Date(item.createdAt).toLocaleString()}
                        </span>

                    </div>

                ))}

            </div>

        </div>

    );
};

export default WithAuthHOC(History);