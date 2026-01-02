function fetchTodos(shouldThrowError: boolean, what: string) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldThrowError) {
        reject({
          message: `Failed to fetch ${what}`,
        });
      } else {
        resolve({
          message: "todos fetched!!",
          data: `${what} data`,
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

// function mainProgram() {
//   try {
//     fetchTodos(false)
//       .then((data) => {
//         console.log("data received for user", data);

//         return fetchTodos(false);
//         // .then((data) => {
//         //   console.log("data received for cart", data);
//         // })
//         // .catch((err) => {
//         //   console.error("error recceived for cart", err);
//         // });
//       })
//       .then((cartData) => {
//         console.log("cart data received", cartData);

//         return fetchTodos(false);
//       })
//       .then((data) => {
//         console.log("data received for payment", data);
//       })
//       .catch((err) => {
//         console.error("error recceived for user", err);
//       })
//       .finally(() => {
//         console.log("finalized!!");
//       });
//   } catch (error) {
//     console.error("Error caught", error);
//   }
//   console.log("program ran successfully!");
// }

async function fetchUser() {
  return {
    message: "user fetched!!",
    data: "user data",
  };
}

async function fetchCart() {
  return {
    message: "cart fetched!!",
    data: "cart data",
  };
}

async function fetchPayment() {
  throw new Error(`Failed to fetch payment`);
}

async function mainProgram() {
  try {
    const user = await fetchUser();
    const cart = await fetchCart();
    const payment = await fetchPayment();
  } catch (error) {
    console.error("Error caught", error);

    // error in cart
  }
}

mainProgram();
