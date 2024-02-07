import React, { useState, useEffect } from 'react';
import Posts from '../Posts/Posts';
import db from '../../firebase';
import Loader from '../../elements/Loader/Loader';
import './Explore.css'; // Assume you have a similar CSS file for Explore

const Explore = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true); // Start with loading true

    useEffect(() => {
        const unsubscribe = db.collection('posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => {
                setLoading(false);
                if (!snapshot.empty) {
                    setPosts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
                }
            }, error => {
                console.log(error);
                setLoading(false);
            });

        // Cleanup function to unsubscribe from the listener when the component unmounts
        return () => unsubscribe();
    }, []);

    return (
        <div className='explore'>
            <div className="explore__header">
                <h2>Explore</h2>
            </div>

            {loading && <div className="explore__loader"><Loader/></div>}

            <Posts posts={posts} />
        </div>
    );
}

export default Explore;
