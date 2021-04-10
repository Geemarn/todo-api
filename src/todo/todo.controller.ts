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
import { JwtAuthGuard } from '../Guards/jwtAuth.guard';
import { CreateTaskDto } from 'src/task/dto/create-task.dto';
import { response } from '../_shared/constant';

@UseGuards(JwtAuthGuard)
@Controller('todos')
export class TodoController {
  constructor(private todoService: TodoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req: Request, @Res() res: Response): Promise<Response> {
    const data = await this.todoService.findAll(req.user);
    return res.json(response(HttpStatus.OK, data));
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.findOne(id, req.user);
    return res.json(response(HttpStatus.OK, data));
  }

  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.create(createTodoDto, req.user);
    return res.json(response(HttpStatus.CREATED, data));
  }

  @Put(':id')
  async update(
    @Body() updateTodoDto: CreateTodoDto,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.update(id, updateTodoDto, req.user);
    return res.json(response(HttpStatus.CREATED, data));
  }

  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.delete(id, req.user);
    return res.json(response(HttpStatus.OK, data));
  }

  @Get(':id/tasks')
  async findAllTasks(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.findAllTasksByTodo(id, req.user);
    return res.json(response(HttpStatus.OK, data));
  }

  @Post(':id/tasks')
  async createTasks(
    @Body() createTaskDto: CreateTaskDto,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.createTaskByTodo(
      createTaskDto,
      id,
      req.user,
    );
    return res.json(response(HttpStatus.CREATED, data));
  }

  @Put(':id1/tasks/:id2')
  async updateTasks(
    @Body() updateTaskDto: CreateTaskDto,
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.updateTaskByTodo(
      updateTaskDto,
      id1,
      id2,
      req.user,
    );
    return res.json(response(HttpStatus.CREATED, data));
  }

  @Delete(':id1/tasks/:id2')
  async deleteTasks(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.deleteTaskByTodo(id1, id2, req.user);
    return res.json(response(HttpStatus.OK, data));
  }

  @Get(':id1/tasks/:id2')
  async findOneTask(
    @Param('id1') id1: string,
    @Param('id2') id2: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.findTaskByTodo(id1, id2, req.user);
    return res.json(response(HttpStatus.OK, data));
  }

  @Put(':id/:status')
  async updateStatus(
    @Param('id') id: string,
    @Param('status') status: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const data = await this.todoService.updateStatus(id, status, req.user);
    return res.json(response(HttpStatus.OK, data));
  }
}
