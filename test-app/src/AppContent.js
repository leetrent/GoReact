import React, { Component } from 'react';

export default class AppContent extends Component {

    anotherFunction = () => {
        console.log("[AppContent][anotherFunction()] =>");
    }

    leftParagraph = () => {
        console.log("[AppContent][leftParagraph()] =>");
    }

    fetchList = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then(json => {
            console.log(json);
            let posts = document.getElementById("post-list");
            json.forEach(function(obj) {
                let li = document.createElement("li");
                li.appendChild(document.createTextNode(obj.title));
                posts.appendChild(li);
            })
        });
    }

    render() {
        return (
            <div>
                Application Content
                <br />
                <hr/>
                <p onMouseEnter={this.anotherFunction} onMouseLeave={this.leftParagraph}>Temporary Paragraph</p>
                <button className="btn btn-sm btn-primary mt-3" href="#" onClick={this.fetchList}>Fetch Data</button>
                <hr/>
                <ul id="post-list"></ul>
            </div>
        );    
    }
}