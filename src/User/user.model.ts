import { Column, Model, Table, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';

@Table({
  tableName: 'user',
  timestamps: true,  
})
export class User extends Model<User> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.ARRAY(DataType.STRING),
    allowNull: false,
    defaultValue: ['user'], // Default role array
  })
  role: string[];

}
