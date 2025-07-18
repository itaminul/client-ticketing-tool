import { Users } from "src/entities/users";
import { DataSource, DataSourceOptions } from "typeorm";
import { Roles } from "./entities/role";
import { Client } from "./entities/client";
import { Projects } from "./entities/projects";
import { GenerateTicket } from "./entities/generate-tickets";
import { TicketAttachments } from "./entities/tickets-attachements";
import { Employees } from "./entities/employees";

export const AppDataSource: DataSourceOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "erpdb",
  password: "123456",
  database: "sup_ticketing_tool",
  entities: [
    Users,
    Roles,
    Client,
    Projects,
    GenerateTicket,
    TicketAttachments,
    Employees,
  ],
  migrations: ["./dist/migrations/*.js"],
  synchronize: false,
  logging: true,
};

const dataSource = new DataSource(AppDataSource);
export default dataSource;

// npm run typeorm -- migration:generate -d ./dist/data-source.js ./src/migrations/CreateEmployeeAndDepartmentTables
//npm run typeorm -- migration:run -d ./src/data-source.ts
