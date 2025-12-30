import app from "./app";
import sequelize from "./config/database";

const PORT = Number(process.env.PORT);

if (!PORT) {
  throw new Error("PORT is not defined");
}


(async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync();
    console.log("Database synced");


    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to DB:", error);
  }
})();
