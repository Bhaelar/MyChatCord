# MyChatCord
MyChatCord is a basic discord-like chatting application for developers created with Javascript, HTML-CSS, MongoDB. It was inspired from [this tutorial](https://www.youtube.com/watch?v=jD7FnbI76Hg&t=1339s) by Brad Traversy. I improved the application by implementing a realtime database for storing rooms and active users.

## Installation
```
npm install
npm run dev
```

Create a default.json file in the config folder and add the following code
```
{
    "mongoURI": "mongodb+srv://<mongo-cluster-username>:<mongo-cluster-password>@cluster0.kc2ld.mongodb.net/Mychatcord?retryWrites=true&w=majority"
}
```

## Usage
Open up your browser and go to http://localhost:3000
