import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class CompilerService {
  // Add your code here
  public async compile() {
    Logger.log('Compiling...');
  }
}
