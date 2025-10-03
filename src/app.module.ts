import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/user.module';
import { HomeModule } from './modules/home/home.module';
import { TransactionsModule } from './modules/transactions/transaction.module';
import { BudgetsModule } from './modules/budgets/budget.module';
import { CategoriesModule } from './modules/categories/category.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>(
          'MONGO_URI',
          'mongodb://localhost:27017/moneycare',
        ),
        dbName: 'moneycare',
      }),
    }),
    AuthModule,
    UsersModule,
    TransactionsModule,
    BudgetsModule,
    HomeModule,
    CategoriesModule,
  ],
})
export class AppModule {}
