import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Ip,
} from '@nestjs/common'
import { EmployeesService } from './employees.service'
import { Prisma } from '@prisma/client'
import { SkipThrottle, Throttle } from '@nestjs/throttler'
import { MyLoggerService } from 'src/my-logger/my-logger.service'

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new MyLoggerService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
    return this.employeesService.create(createEmployeeDto)
  }

  @SkipThrottle({
    default: false,
  })
  @Get()
  findAll(
    @Ip() ip: string,
    @Query('role') role?: 'INTERN' | 'ENGINEER' | 'ADMIN',
  ) {
    this.logger.log(
      `Request for all employees \t ${ip}`,
      EmployeesController.name,
    )
    return this.employeesService.findAll(role)
  }

  @Throttle({
    short: {
      ttl: 1000,
      limit: 3,
    },
  })
  @Get(':id')
  findOne(@Ip() ip: string, @Param('id') id: string) {
    this.logger.log(
      `Request for single employee \t ${ip}`,
      EmployeesController.name,
    )
    return this.employeesService.findOne(+id)
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput,
  ) {
    return this.employeesService.update(+id, updateEmployeeDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id)
  }
}
