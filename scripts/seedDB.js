const mongoose = require("mongoose");
const db = require("../models");

// This file empties the user collections and inserts the data below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/dadOverflow"
);

const userSeed = [
  {
    email: "test1@test.com",
    displayName: "Test One",
    image: "",
    date: new Date(Date.now())
  },
  {
    email: "test2@test.com",
    displayName: "Test One",
    image: "",
    date: new Date(Date.now())
  },
  {
    email: "test3@test.com",
    displayName: "Test One",
    image: "",
    date: new Date(Date.now())
  }
];

const postSeed = [
  {
    title: "Test Post Title",
    body: "This is the body of the test post",
    date: new Date(Date.now())
  },
  {
    title: "Test Post Title 2",
    body: "This is the body of the test post 2",
    date: new Date(Date.now())
  },
  {
    title: "Test Post Title 3",
    body: "This is the body of the test post 3",
    date: new Date(Date.now())
  }
];

const commentSeed = [
  {
    body: "This is a comment 1",
    author: "First Person",
    date: new Date(Date.now())
  },
  {
    body: "This is a comment 2",
    author: "Second Person",
    date: new Date(Date.now())
  },
  {
    body: "This is a comment 3",
    author: "Third Person",
    date: new Date(Date.now())
  }
];

const taskSeed = [
  {
    body: "Task body 1",
    isComplete: false,
    date: new Date(Date.now())
  },
  {
    body: "Task body 2",
    isComplete: false,
    date: new Date(Date.now())
  },
  {
    body: "Task body 3",
    isComplete: false,
    date: new Date(Date.now())
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(userData => {
    console.log(userData.result.n + " user records inserted!");
    return userData;
  })
  .then(userData => {
    return new Promise((resolve, reject) => {
      db.Post.remove({})
        .then(() => resolve(userData))
        .catch((err) => reject(err))
    });
  })
  .then(userData => {
    return new Promise((resolve, reject) => {
      db.Task.remove({})
        .then(() => resolve(userData))
        .catch((err) => reject(err))
    });
  })
  .then(userData => {

    return new Promise((resolve, reject) => {

      taskSeed.forEach(task => {
        const randomUserIndex = Math.floor(Math.random() * userData.ops.length);
        const randomUser = userData.ops[randomUserIndex];
        task.userId = randomUser._id;
      });
  
      db.Task.collection.insertMany(taskSeed)
        .then((taskData) => {
          console.log(taskData.result.n + " task records inserted!");
          resolve(userData);
        })
        .catch(err => reject(err));
    });
  })
  .then(userData => {
    postSeed.forEach(post => {
      const randomUserIndex = Math.floor(Math.random() * userData.ops.length);
      const randomUser = userData.ops[randomUserIndex];
      post.userId = randomUser._id;
    });

    return db.Post.collection.insertMany(postSeed);
  })
  .then(postData => {
    console.log(postData.result.n + " post records inserted!");
    return postData;
  })
  .then((postData) => {
    return new Promise((resolve, reject) => {
      db.Comment.remove({})
        .then(() => resolve(postData))
        .catch((err) => reject(err))
    });
  })
  .then((postData) => {

    commentSeed.forEach(comment => {
      const randomPostIndex = Math.floor(Math.random() * postData.ops.length);
      const randomPost = postData.ops[randomPostIndex];
      comment.postId = randomPost._id;
    });
    
    return db.Comment.collection.insertMany(commentSeed);
  })
  .then(commentData => {
    console.log(commentData.result.n + " comment records inserted!");
  })
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });