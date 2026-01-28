import { Module } from "../core";
import { UsersModule } from "./users/users.module";

@Module({
    controllers: [],
    prividers: [],
    imports: [UsersModule]
})
export class AppModule {}