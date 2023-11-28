import React, { useState, useEffect } from 'react';
import { IPost, IComment } from './types';
import Comments from './Comments';
import './App.css'; // Make sure this path is correct

const App: React.FC = () => {
    // ... [rest of your useState and useEffect hooks]
    const [posts, setPosts] = useState<IPost[]>([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostContent, setNewPostContent] = useState('');

    useEffect(() => {
        // Load posts from local storage on initial render
        const storedPosts = localStorage.getItem('posts');
        if (storedPosts) {
            setPosts(JSON.parse(storedPosts));
        }
    }, []);

    useEffect(() => {
        // Update local storage when posts change
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const handleAddPost = () => {
        const newPost: IPost = {
            id: Date.now(), // Simple ID generation
            title: newPostTitle,
            content: newPostContent,
            comments: []
        };
        setPosts([...posts, newPost]);
        setNewPostTitle('');
        setNewPostContent('');
    };

    const handleAddComment = (postId: number, commentContent: string) => {
        const newComment: IComment = {
            id: Date.now(),
            postId: postId,
            content: commentContent
        };
        setPosts(posts.map(post =>
            post.id === postId ? { ...post, comments: [...post.comments, newComment] } : post
        ));
    };

    return (
        <div className="app-container">
            <h1>Forum App</h1>
            <div className="new-post">
                <input
                    type="text"
                    placeholder="Title"
                    value={newPostTitle}
                    onChange={e => setNewPostTitle(e.target.value)}
                    className="input-field"
                />
                <textarea
                    placeholder="Content"
                    value={newPostContent}
                    onChange={e => setNewPostContent(e.target.value)}
                    className="textarea-field"
                />
                <button onClick={handleAddPost} className="submit-button">Add Post</button>
            </div>
            <div className="posts-container">
                {posts.map(post => (
                    <div key={post.id} className="post">
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                        <Comments 
                            postId={post.id} 
                            comments={post.comments} 
                            onAddComment={handleAddComment} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
