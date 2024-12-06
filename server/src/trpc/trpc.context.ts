import type {INestApplication} from '@nestjs/common';

export interface TrpcContext {
    main: INestApplication;
}
