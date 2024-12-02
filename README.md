<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.



### 3. Configure Environment Variables

Create a `.env` file in the root of the project and set the necessary database connection variables:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=CRUD
JWT_SECRET=your-secret-key
JWT_EXPIRATION=3600
```

Replace the values of `DB_USERNAME`, `DB_PASSWORD`, and `DB_NAME` with your PostgreSQL credentials. Also, set a `JWT_SECRET` for signing your JWT tokens.

### 4. Database Setup

Ensure that you have PostgreSQL running locally or remotely. You can use Docker to set up a PostgreSQL container if necessary.

Example for running PostgreSQL using Docker:

```bash
docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
```

### 5. Run Migrations (Optional)

If you're using Sequelize migrations (instead of `synchronize`), you can run the following command to apply the migrations:

```bash
npx sequelize-cli db:migrate
```

If you don't use migrations and prefer `synchronize: true` (in `AppModule`), Sequelize will automatically sync the models when the app starts.

### 6. Start the Application

Run the NestJS application using the following command:

```bash
npm run start
```

By default, the app will run on `http://localhost:3000`.

### 7. Test the Endpoints

#### User Registration
- **POST** `/users` – Register a new user (requires `name`, `email`, and `password`).

#### User Login
- **POST** `/users/auth/login` – Login using `email` and `password`. Returns a JWT token if successful.

#### User Logout
- **POST** `/users/auth/logout` – Logout (requires authentication).

#### Get User By ID
- **GET** `/users/:id` – Retrieve user details by ID (authentication required).

#### Get All Users (Admin Only)
- **GET** `/users` – Retrieve all users (accessible only to admins).

#### Update User
- **PUT** `/users/:id` – Update user details (authentication required).

#### Delete User
- **DELETE** `/users/:id` – Delete user by ID (authentication required).

## Guards and Roles

- **JWT Auth Guard**: Protects routes by verifying the JWT token in the `Authorization` header.
- **Roles Guard**: Protects routes with role-based authorization. For example, only users with the `admin` role can access certain routes (like `GET /users`).
- **Local Auth Guard**: Used for handling the login process, verifying user credentials using the `local.strategy.ts` file.

## Example

### User Registration

Request:

```json
POST /users
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "$2a$10$...." // hashed password
}
```

### User Login

Request:

```json
POST /users/auth/login
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

Response:

```json
{
  "access_token": "your_jwt_token_here"
}
```

### Get All Users (Admin Only)

Request (Authenticated with JWT):

```json
GET /users
```

Response:

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "johndoe@example.com",
    "roles": ["user"]
  }
]
```

## Troubleshooting

1. **Database Connection Errors**: Ensure that your PostgreSQL server is running and that the credentials in your `.env` file are correct.
2. **JWT Token Errors**: Make sure to send the token in the `Authorization` header in the format `Bearer <token>`.
3. **Role-Based Access**: If you encounter permission issues, double-check the roles assigned to users in the database.



## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
