import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { HttpEvent,HttpInterceptor,HttpHandler,HttpRequest,HttpResponse,HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor{

    constructor(private router:Router){
        //Recobe como parametro un variable de tipo router
    }

    //Recibe un request, un manejador, un observable
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        let token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZTQ4ODgzZTAxYWE5NjNjZThkOGE2ZDkwMDVkYjE1MSIsInN1YiI6IjVkNWQ0ZjQ4YTNkMDI3MDAxNDBiZDkzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.w4iJG7DNBvihwHWQI4wiCPmuE-7vao2FBV9hnNRtFxg';
        //Clonar el request para que en sus encabezados este el autorization con el token valido del api.
        req = req.clone({
            setHeaders: {
                Authorization: `${token}`
            }
        });

        return next.handle(req).pipe(
            tap((event: HttpEvent<any>) =>{
                if(event instanceof HttpResponse){
                    console.log(event);
                }
            },(err: any) => {
                if(err instanceof HttpErrorResponse){
                    if(err.status == 401){
                        this.router.navigate(['/auth']);
                    }
                }
            }
            )
        )
    }
}
