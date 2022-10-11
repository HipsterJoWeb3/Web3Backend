import {ExecutionContext, CanActivate, HttpException, HttpStatus, Injectable} from '@nestjs/common';
// @ts-ignore
import {JwtService} from "@nestjs/jwt";
import {Observable} from 'rxjs';
import {ROLES_KEY} from "./auth-roles.decorator";
import {Reflector} from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector
    ) {}


    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!requiredRoles) return true;



        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization.split(' ');
            const bearer = authHeader[0];
            const token = authHeader[1];

            if(bearer !== 'Bearer' || !token) {
                throw new HttpException('Not auth', 401);
            }

            const user = this.jwtService.verify(token);
            console.log(requiredRoles);
            console.log(user.roles.some(role =>  requiredRoles.includes(role.value)));
            req.user = user;

            if(!user.roles.some(role => requiredRoles.includes(role.value))) throw new HttpException({message: 'Denied access'}, HttpStatus.FORBIDDEN);
            return true
        } catch (e) {

            throw new HttpException({message: 'Denied access'}, HttpStatus.FORBIDDEN);
        }

    }
}