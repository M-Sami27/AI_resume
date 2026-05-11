import React, { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import Skeleton from '@mui/material/Skeleton';
import WithAuthHOC from '../../utils/HOC/withAuthHOC';

const Admin = () => {

  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(true);

  useEffect(() => {

    // MOCK DATA (frontend only)
    setTimeout(() => {
      setData([
        {
          id: 1,
          name: "John Doe",
          email: "john@example.com",
          score: 88
        },
        {
          id: 2,
          name: "Sara Khan",
          email: "sara@example.com",
          score: 76
        },
        {
          id: 3,
          name: "Ali Ahmed",
          email: "ali@example.com",
          score: 92
        }
      ]);

      setLoader(false);
    }, 1200);

  }, []);

  return (
    <div className={styles.Admin}>

      <div className={styles.header}>
        <h1>Admin Panel</h1>
        <p>Manage and monitor resume analysis data</p>
      </div>

      <div className={styles.grid}>

        {loader && (
          <>
            <Skeleton variant="rectangular" width={260} height={300} />
            <Skeleton variant="rectangular" width={260} height={300} />
            <Skeleton variant="rectangular" width={260} height={300} />
          </>
        )}

        {!loader && data.map((item) => (
          <div key={item.id} className={styles.card}>

            <h3>{item.name}</h3>
            <p>{item.email}</p>

            <div className={styles.score}>
              Score: {item.score}%
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default WithAuthHOC(Admin);