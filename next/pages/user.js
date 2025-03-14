import React from "react";

const user = ({ posts }) => {
    return (
        <div>
            <h1>Daftar Pengguna</h1>
            {posts.map((post) => (
                <div key={post.name}>
                    <h2>{post.username}</h2>
                    <p>{post.email}</p>
                </div>
            ))}
        </div>
    );
};

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    const posts = await res.json();

    return {
        props: {
            posts,
        },
    };
}

export default user;