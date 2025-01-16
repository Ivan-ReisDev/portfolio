import { inject, } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';
import { delay, finalize } from 'rxjs/operators';
import { BusyService } from '../resource/service/busy.service';

export const LoadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(BusyService);
  spinnerService.busy();
  return next(req).pipe(
    delay(1000),
    finalize(() => { spinnerService.unoccupied(); })
  );
};
