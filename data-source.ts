import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "123456",
  database: "sup_ticketing_tool",
  entities: [__dirname + "/../**/*.entity{.ts,.js}"], // Path to your entities
  migrations: [__dirname + "/../migrations/*{.ts,.js}"], // Path to your migrations
  synchronize: true, // Use only in development; false in production
});


AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

