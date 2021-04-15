import {
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
} from '@nestjs/common';
import { EntityId } from 'typeorm/repository/EntityId';
import { CommonFunctions } from '../../common/functions';
import { BlogModel } from '../../controller/blog/model/BlogModel';
import { CreateBlogModel } from '../../controller/blog/model/createBlogModel';
import { UpdateBlogModel } from '../../controller/blog/model/updateBlogModel';
import { Blog } from '../../database/entity/blog.entity';

@Injectable()
export class BlogService {
  /**
   * Create blog base on model
   * @param model
   */
  public async createBlog(model: CreateBlogModel): Promise<BlogModel> {
    let entity: Blog = new Blog();
    entity = CommonFunctions.map(model, entity);
    entity = await Blog.save(entity);
    let returnModel = new BlogModel();
    returnModel = CommonFunctions.map(entity, returnModel);
    return returnModel;
  }

  /**
   * Udpdate blog base on model
   * @param model
   */
  public async updateBlog(model: UpdateBlogModel): Promise<BlogModel> {
    if (!model.id) {
      throw new NotAcceptableException('Cannot update data with blank id');
    }
    let entity = await Blog.findOne(model.id);
    if (!entity) {
      throw new InternalServerErrorException(
        'Cannot find entity with id ' + model.id,
      );
    }
    entity = CommonFunctions.map(model, entity);
    entity = await Blog.save(entity);
    let returnModel = new BlogModel();
    returnModel = CommonFunctions.map(entity, returnModel);
    return returnModel;
  }

  /**
   * delete blog
   * @param id
   */
  public async deleteBlog(id: EntityId): Promise<boolean> {
    const entity = await Blog.findOne(id);
    if (!entity) {
      throw new InternalServerErrorException(
        'Cannot find entity with id ' + id,
      );
    }
    await Blog.delete(id);
    return true;
  }
}
