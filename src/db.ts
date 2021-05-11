import { Column, Sequelize, Model, HasMany, BelongsTo, Table, ForeignKey } from 'sequelize-typescript';
import _ from 'lodash';
import Faker from 'faker';
import connectionString from '../connectionString.json'

@Table
export class User extends Model {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  email: string;

  @HasMany(() => Book)
  books: Book[];

  @ForeignKey(() => Book)
  bookId: number;
}

@Table
export class Book extends Model {
  @Column
  title: string;

  @Column
  description: string;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  userId: number;
}

const sequelize = new Sequelize({
    database: connectionString.database,
    dialect: "postgres",
    username: connectionString.username,
    password: connectionString.password,
    models: [User, Book]
  }
)



sequelize.sync({ force: true }).then(() => {
  _.times(10, () => {
     return User.create({
       username: Faker.internet.userName(),
       password: Faker.internet.password(),
       email: Faker.internet.email()
     }).then(user => {
       return user.$create('book', {
         title: Faker.name.title(),
         description: Faker.random.locale()
       })
     })
  });
});

export default sequelize;