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
import { Task } from '../task/interfaces/task.interfaces';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
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

  @Get(':id/tasks')
  findAllTasks(@Param('id') id: string, @Req() req: Request): Promise<Task[]> {
    return this.todoService.findAllTasksByTodo(id, req.user);
  }

  @Post(':id/tasks')
  createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @Param('id') id: string,
    @Req() req: Request,
  ): Promise<Task> {
    return this.todoService.createTaskByTodo(createTaskDto, id, req.user);
  }

  @Put(':id1/tasks/:id2')
  updateTasks(
    @Body() updateTaskDto: CreateTaskDto,
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @Req() req: Request,
  ): Promise<Task> {
    return this.todoService.updateTaskByTodo(updateTaskDto, id1, id2, req.user);
  }

  @Delete(':id1/tasks/:id2')
  deleteTasks(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @Req() req: Request,
  ): Promise<Task> {
    return this.todoService.deleteTaskByTodo(id1, id2, req.user);
  }

  @Get(':id1/tasks/:id2')
  findOneTask(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @Req() req: Request,
  ): Promise<Task> {
    return this.todoService.findTaskByTodo(id1, id2, req.user);
  }
}
