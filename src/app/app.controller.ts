import { Controller, Get } from "../core";

@Controller()
export class AppController {
    @Get()
    home() {
        return '';
    }
}