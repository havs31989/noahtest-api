import {
  Body,
  Controller,
  Delete,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { EntityId } from 'typeorm/repository/EntityId';
import { Route } from '../../../config/route';
import { JWTInternalGuard } from '../../auth/auth.internal.guard';
import { BlogService } from '../../service/blog/blog.service';
import { BlogModel } from './model/BlogModel';
import { CreateBlogModel } from './model/createBlogModel';
import { UpdateBlogModel } from './model/updateBlogModel';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @UseGuards(JWTInternalGuard)
  @ApiBearerAuth()
  @Post(Route.blogCreate)
  public async createBlog(@Body() model: CreateBlogModel): Promise<BlogModel> {
    return await this.blogService.createBlog(model);
  }

  @UseGuards(JWTInternalGuard)
  @ApiBearerAuth()
  @Put(Route.blogUpdate)
  public async updateBlog(@Body() model: UpdateBlogModel): Promise<BlogModel> {
    return await this.blogService.updateBlog(model);
  }

  @UseGuards(JWTInternalGuard)
  @ApiBearerAuth()
  @ApiQuery({ name: 'id' })
  @Delete(Route.blogDelete)
  public async deleteBlog(@Query('id') id: EntityId): Promise<boolean> {
    return await this.blogService.deleteBlog(id);
  }
}
