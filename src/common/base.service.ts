import { HttpStatus, Injectable } from "@nestjs/common";
import {
  Repository,
  FindManyOptions,
  FindOptionsWhere,
  DeepPartial,
  EntityManager,
  DataSource,
} from "typeorm";

@Injectable()
export abstract class BaseService<T> {
  constructor(
    protected readonly repository: Repository<T>,
    // protected readonly dataSource: DataSource
  ) {}

//   async runInTransaction<T>(
//     callback: (manager: EntityManager) => Promise<T>
//   ): Promise<T> {
//     const queryRunner = this.dataSource.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();

//     try {
//       const result = await callback(queryRunner.manager);
//       await queryRunner.commitTransaction();
//       return result;
//     } catch (error) {
//       await queryRunner.rollbackTransaction();
//       throw error;
//     } finally {
//       await queryRunner.release();
//     }
//   }

  async getAll(
    page: number = 1,
    limit: number = 10,
    options?: FindManyOptions<T>
  ): Promise<{ result: T[]; total: number }> {
    try {
      const [result, total] = await this.repository.findAndCount({
        take: limit,
        skip: (page - 1) * limit,
        ...options,
      });
      return { result, total };
    } catch (error) {
      throw error;
    }
  }

  async create(data: DeepPartial<T>): Promise<T> {
    try {
      const entity = this.repository.create(data);
      return await this.repository.save(entity);
    } catch (error) {
      throw error;
    }
  }

  async update(
    id: any,
    partialEntity: DeepPartial<T>,
    options?: { where?: FindOptionsWhere<T> }
  ): Promise<{ status: HttpStatus; message: string } | T> {
    try {
      const where = options?.where || ({ id } as FindOptionsWhere<T>);
      const existing = await this.repository.findOne({ where });

      if (!existing) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Data not found",
        };
      }

      Object.assign(existing, partialEntity);
      return await this.repository.save(existing);
    } catch (error) {
      throw error;
    }
  }

  async delete(id: any): Promise<{ status: HttpStatus; message: string }> {
    try {
      const result = await this.repository.delete(id);
      if (result.affected === 0) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: "Data not found",
        };
      }
      return {
        status: HttpStatus.OK,
        message: "Data deleted successfully",
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(options: FindManyOptions<T>): Promise<T | null> {
    try {
      return await this.repository.findOne(options);
    } catch (error) {
      throw error;
    }
  }
}
