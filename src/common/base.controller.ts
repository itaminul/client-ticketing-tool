// src/common/base.controller.ts
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Patch,
    Delete,
    Query,
    HttpStatus,
  } from '@nestjs/common';
  import { BaseService } from './base.service';
  import { PaginationQueryDto } from './dto/pagination-query.dto';
  

  @Controller()
  export abstract class BaseController<T> {
    constructor(protected readonly service: BaseService<T>) {}
  
    @Get()
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
      const { page = 1, limit = 10 } = paginationQuery;
      return this.service.getAll(page, limit);
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string) {
      const result = await this.service.findOne({ where: { id } as any });
      if (!result) {
        return {
          status: HttpStatus.NOT_FOUND,
          message: 'Item not found',
        };
      }
      return result;
    }
  
    @Post()
    async create(@Body() createDto: any) {
      return this.service.create(createDto);
    }
  
    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateDto: any) {
      return this.service.update(id, updateDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string) {
      return this.service.delete(id);
    }
  }