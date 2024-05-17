import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Data } from './data.db';

@Injectable()
export class DataDao {
  constructor(
    @InjectModel(Data.name, 'local')
    private dataModel: Model<Data>,
  ) {}

  async get(id: string) {
    return this.dataModel.findById(id);
  }

  async getAll() {
    return this.dataModel.find();
  }

  async create(data: Data) {
    const r = await this.dataModel.create(data);
    return { _id: r._id, data: r.data };
  }

  async delete(id: string) {
    return this.dataModel.deleteOne({ _id: id });
  }

  async update(id: string, comment: Data) {
    return this.dataModel.findByIdAndUpdate({ _id: id }, comment);
  }
}
