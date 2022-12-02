import {CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Observable} from "rxjs";


@Injectable()
export class PostsAllGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
    ) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        try {
            const authHeader = req.headers.authorization.split(' ');
            const bearer = authHeader[0];
            const token = authHeader[1];

            if (bearer !== 'Bearer' || !token) req.postsAll = false;


            const user = this.jwtService.verify(token);



            if(user) req.postsAll = true;


            return true
        } catch (e) {
            req.postsAll = false;
            return true
        }
    }
}