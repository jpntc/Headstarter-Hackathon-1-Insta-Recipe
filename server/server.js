import express from "express";
import OpenAI from "openai";
import pg from "pg";

const openai = new OpenAI({});
const app = express();
// const db = new pg.Client({
//   user: "",
//   host: "",
//   database: "",
//   password: "!",
//   port: ,
// });
// db.connect();
const port = 3000;
//upon launch express uses landing page route
app.use(express.static("frontend"));
app.use(express.json());
//ios encoded???
app.use(express.urlencoded({ extended: true }));

//Route handler
app.post("/recipe", async (req, res) => {
  const userIngredients = req.body.ingredients;

  //   console.log(ingredientString);
  //   console.log("hit");
  const chatResponse = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${userIngredients}: using those ingredients give me a single recipe name I can make and a step by step tutorial in this format: 
                (Recipe Name:
                step 1:
                step 2:
                etc)
                as if I had no experience cooking`,
      },
    ],
  });
  const chatGpt = chatResponse.choices[0].message.content;
  //   console.log(chatGpt);
  res.send(chatGpt);
});

app.listen(port, () => {
  console.log(`Serer running on port https://PUTIPHERE:${port}`);
});
