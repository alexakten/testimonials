module.exports = (req, res) => {
  console.log("Backend function called");
  res.status(200).json({ message: "Hello from backend" });
};
