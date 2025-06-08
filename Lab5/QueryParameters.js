export default function QueryParameters(app) {
  app.get("/lab5/calculator", (req, res) => {
    const { a, b, operation } = req.query;
    const x = parseFloat(a), y = parseFloat(b);
    let result;

    switch (operation) {
      case "add":      result = x + y;           break;
      case "subtract": result = x - y;           break;
      case "multiply": result = x * y;           break;
      case "divide":   result = y ? x / y : 0;   break;
      default:         result = "Invalid operation";
    }
    res.send(result.toString());
  });
}
