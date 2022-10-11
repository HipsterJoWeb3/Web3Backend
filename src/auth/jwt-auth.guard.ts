import {ExecutionContext, CanActivate, HttpException, HttpStatus, Injectable} from '@nestjs/common';
// @ts-ignore
import {JwtService} from "@nestjs/jwt";
import {Observable} from 'rxjs';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
            private jwtService: JwtService,
    ) {}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization.split(' ');
            const bearer = authHeader[0];
            const token = authHeader[1];

            if(bearer !== 'Bearer' || !token) {
                throw new HttpException('Нет авторизации', 401);
            }

            const user = this.jwtService.verify(token);
            req.user = user;
            return true
        } catch (e) {
            throw new HttpException({message: 'Пользователь не авторизован'}, HttpStatus.UNAUTHORIZED);
        }

    }
}