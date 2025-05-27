import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { GetUsersRequestDto } from './dto/req/get-users.dto';
import { GetUsersResponseDto } from './dto/res/get-users.dto';
import { GetUsersQuery } from '../application/query/get-users.query';
import { AuthGuard } from '@nestjs/passport';
import { GetUserResponseDto } from './dto/res/get-user.dto';
import { GetUserQuery } from '../application/query/get-user.query';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(
    private commandBus: CommandBus,
    private queryBus: QueryBus,
  ) {}

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get users list with pagination' })
  @ApiResponse({
    status: 200,
    description: 'Returns paginated list of users',
    type: GetUsersResponseDto,
  })
  async findAllUsers(@Query() query: GetUsersRequestDto): Promise<GetUsersResponseDto> {
    const result = await this.queryBus.execute(plainToInstance(GetUsersQuery, query));
    return plainToInstance(GetUsersResponseDto, result);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns user by id',
    type: GetUserResponseDto,
  })
  async findOneUser(@Param('id') id: string) {
    const result = await this.queryBus.execute(plainToInstance(GetUserQuery, { id }));
    return plainToInstance(GetUserResponseDto, result);
  }
}
