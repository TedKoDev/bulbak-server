import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchTermModule } from './apis/search-term/search-term.module';

@Module({
  imports: [SearchTermModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
