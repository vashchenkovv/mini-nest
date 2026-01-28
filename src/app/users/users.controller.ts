import { Body, Get, Post, usePipes } from "../../core/";
import { Controller, UseGuards } from "../../core";
import { Role, RolesGuard } from "../gurards/roles.guard";
import { Param, Query } from "../../core/";
import { ParseIntPipe } from "../../core";
import { UsersService } from "./users.service";
import type { CreateUserDto } from "./users.dto";
import { ZodValidationPipe } from "../pipes/zod.pipe";
import { CreateUserShema } from "./user.shcema";

@Controller('users')
@UseGuards(RolesGuard)
export class UsersController {
    constructor(
        private usersService: UsersService
    ) {}

    @Get()
    getAll(@Query('offset', ParseIntPipe) offset: number, @Query('limit', ParseIntPipe) limit: number) {
        return this.usersService.getAll(offset, limit);
    }

    @Get('admin')
    @Role('admin')
    greetingAdmin() {
        return 'Welcome administrator';
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id);
    }

    @Post()
    @usePipes(new ZodValidationPipe(CreateUserShema))
    add(@Body() user: CreateUserDto) {
        return this.usersService.add(user.name, user.email);
    }
}