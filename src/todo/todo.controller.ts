import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Req,
  Res,
  Param,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { Request, Response } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './interfaces/todo.interfaces';
import { JwtAuthGuard } from '../Guards/jwtAuth.guard';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Req() req: Request): Promise<Todo[]> {
    return this.todoService.findAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request): Promise<Todo> {
    return this.todoService.findOne(id, req.user);
  }

  @Post()
  create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: Request,
  ): Promise<Todo> {
    return this.todoService.create(createTodoDto, req.user);
  }

  @Put(':id')
  update(
    @Body() updateTodoDto: CreateTodoDto,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto, req.user);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req: Request): Promise<Todo> {
    return this.todoService.delete(id, req.user);
  }
}
