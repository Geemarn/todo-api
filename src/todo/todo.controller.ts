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
  // findAll(@Req() req: Request, @Res() res: Response): Response {
  //   return res.send('welcome express');
  // }
  findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(id);
  }

  @Post()
  create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  update(
    @Body() updateTodoDto: CreateTodoDto,
    @Param('id') id: string,
  ): Promise<Todo> {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<Todo> {
    return this.todoService.delete(id);
  }
}
