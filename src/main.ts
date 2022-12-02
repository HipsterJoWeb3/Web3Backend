import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import {ValidationPipe} from "./pipes/validation.pipe";
// @ts-ignore
import {useContainer} from "class-validator";


const start = async () => {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppModule);

    app.enableCors();

    await app.listen(PORT, () => console.log('Server started on port ' + PORT));
}

start()