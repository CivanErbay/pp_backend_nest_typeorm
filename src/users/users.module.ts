import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

/* But every time we use an external dependency we need to import it,
 so that will be available in the service we wanted to use it. 
 To import an external dependency we have to edit the module of 
 the resource we are working with. */

/*  In Nest.js with TypeORM, the forFeature method provided by 
 TypeOrmModule is used to import and register specific repository 
 classes representing entities from the database. 
 When you define TypeOrmModule.forFeature([User]) 
 in the imports array of a module, you are indicating that 
 the module will use the User entity and its associated repository 
 for database operations. */
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [TypeOrmModule],
})
export class UsersModule {}
