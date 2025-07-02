import {
  Repository,
  FindOneOptions,
  FindManyOptions,
  DeleteResult,
  DeepPartial,
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export class BaseRepository<T> extends Repository<T> {
  async findById(
    id: string | number,
    options?: FindOneOptions<T>
  ): Promise<T | undefined> {
    return this.findOne({
      where: { id },
      ...options,
    } as FindOneOptions<T>);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return this.find(options);
  }

  async createEntity(data: DeepPartial<T>): Promise<T> {
    const entity = this.create(data);
    return this.save(entity);
  }

  async createEntities(data: DeepPartial<T>[]): Promise<T[]> {
    const entities = this.create(data);
    return this.save(entities);
  }

  async updateEntity(
    id: string | number,
    partialEntity: QueryDeepPartialEntity<T>
  ): Promise<T | undefined> {
    await this.update(id, partialEntity);
    return this.findById(id);
  }

  async deleteEntity(id: string | number): Promise<DeleteResult> {
    return this.delete(id);
  }
}
