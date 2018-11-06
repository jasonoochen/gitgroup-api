# Developer Guide

## GitHub API

**Repositories**<br>
This application will be able to **read and write all public and private repository data**. This includes the following:

- Code
- Issues
- Pull requests
- Wikis
- Settings
- Webhooks and services
- Deploy keys
- Collaboration invites

[API referrence](https://developer.github.com/v3/repos/)

## How to Start The Server

You need clone this repository first, then install dependencies.<br>

```
> cd gitgroup-api
> npm install
```

When you develop this project, you can just use ts-node in order to run the server.

```
npm run dev
```

When you test the code.

```
npm run test
```

The following commands are just required when you distribute the app

```
npm run build
npm run start
```

## API list

### Repository

- _/repos_ - get all repositories of the owner

### Project

- _POST /project/new_ - create a new project to owner
  - body: {name: your project name}
