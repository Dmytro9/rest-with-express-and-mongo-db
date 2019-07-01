const p = new Promise((res, rej) => {
  // Kick off some async work
  setTimeout(() => {
    // res(1);
    rej(new Error("Error message..."));
  }, 2000);
});

p.then(result => console.log(result)).catch(err => console.log(err.message));

// Promise.all (one after another not waiting for result)
// Promise.race (return a value after first promise resolved)
// use try / catch for errors handling
