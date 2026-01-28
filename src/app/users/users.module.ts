import { Module } from "../../core";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    controllers: [
        UsersController
    ],
    prividers: [
        UsersService
    ]
})
export class UsersModule{

}