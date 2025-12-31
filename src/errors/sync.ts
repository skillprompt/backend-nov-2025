console.log("Error handling...");

const stu = { name: "js" };
const stuStr = JSON.stringify(stu);

try {
  const parsedStu = JSON.parse(stuStr + "js");
  console.log("parsedStu", parsedStu);
} catch (error) {
  console.error("Error caught", error);
}

console.log("program ran successfully!");
