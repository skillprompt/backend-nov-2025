function fetchTodos(shouldThrowError: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldThrowError) {
        reject({
          message: "Failed to fetch",
        });
      } else {
        resolve({
          message: "todos fetched!!",
        });
      }
    }, 1000);
  });
}

// setTimeout(() => {
//   console.log("ran after 1s");
// }, 2000);

// setInterval(() => {
//   console.log("sending message after every 1s");
// }, 1000);

async function mainProgram() {
  try {
    // fetchTodos(true)
    //   .then((data) => {
    //     console.log("data received", data);
    //   })
    //   .catch((err) => {
    //     console.error("error recceived", err);
    //   })
    //   .finally(() => {
    //     console.log("finalized!!");
    //   });

    await fetchTodos(true);
  } catch (error) {
    console.error("Error caught", error);
  }
  console.log("program ran successfully!");
}

mainProgram();
