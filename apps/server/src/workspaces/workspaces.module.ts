import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';

@Module({
  imports: [],
  controllers: [],
  providers: [WorkspacesService],
  exports: [WorkspacesService]
})
export class WorkspacesModule {
}
