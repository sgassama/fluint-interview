import { Injectable } from '@nestjs/common';
import { Data } from 'src/data.db';
import { DataDao } from './data.dao';

@Injectable()
export class AppService {
  constructor(private readonly dataDao: DataDao) {}

  async getAll(): Promise<Data[]> {
    return this.dataDao.getAll();
  }

  async create(content: string): Promise<Data> {
    return this.dataDao.create({ data: content });
  }

  async update(id: string, content: Data): Promise<Data> {
    return this.dataDao.update(id, content);
  }

  async delete(id: string): Promise<void> {
    await this.dataDao.delete(id);
  }
}
