import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserCommand } from '../application/command/create-user.command';
import { GetUsersRequestDto } from './dto/req/get-users.dto';
import { GetUsersResponseDto } from './dto/res/get-users.dto';
import { GetUsersQuery } from '../application/query/get-users.query';

@Controller('users')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const command = new CreateUserCommand(
      createUserDto.id,
      createUserDto.securityCode,
      createUserDto.countryCode,
      createUserDto.phoneNumber,
    );
    return this.commandBus.execute(command);
  }

  @Get()
  @ApiOperation({ summary: 'Get users list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of users',
    type: GetUsersResponseDto,
  })
  async getUsers(
    @Query() query: GetUsersRequestDto,
  ): Promise<GetUsersResponseDto> {
    const result = await this.queryBus.execute(
      plainToInstance(GetUsersQuery, query),
    );
    return plainToInstance(GetUsersResponseDto, result);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return;
  }
}
