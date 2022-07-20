import { HttpModule } from '@nestjs/axios';
import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

// import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ApiConfigService } from './services/api-config.service';

const providers = [ApiConfigService];

@Global()
@Module({
  providers,
  imports: [HttpModule, CqrsModule],
  exports: [...providers, HttpModule, CqrsModule],
})
export class SharedModule {}
