console.log("Before");
getUser(1, user => {
  getRepositories(user.githubUsername, repos => {
    console.log("Repos ", repos);
  });
});
console.log("After");

// Callback
// Promises
// Async / Await

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading from db...");
    callback({
      id,
      githubUsername: "Dmytro9"
    });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("Calling GitHub API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
