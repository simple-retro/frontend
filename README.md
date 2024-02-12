# 👨‍💻 Simple Retro

## 🔥 | Running the project

To run Simple Retro, you need to have [Node.js](https://www.docker.com/) in your machine. We recommend the usage of the `Yarn` package manager, so the instalation follows the `yarn.lock` lockfile.

1. 🧹 Clone the repository

```bash
git clone git@github.com:simple-retro/frontend.git
```

2. 💻 Installing the dependencies

```bash
yarn install
```

3. 🔑 Preparing the enviroment

When building the application, the environment variables defined in the `.env` file will be used to replace all envs with their value in the bundled JavaScript files.

```bash
cp .env.example .env
```

> Replace all variables with the values ​​that suit your need.

4. 🏃‍♂️ Running

```bash
yarn dev --host
```

> Now, access the address in your terminal 🔥

### 📦 Buiding for production

To deploy the Simple Retro, bundle all files with the following command:

```bash
yarn build
```

All files will be available in the `dist` folder. When deploying, you need to return the `index.html` file to all requests that dont fit any existing files.

## 🔨 | Made With

- [Node.js](https://nodejs.org/)
- [Vite](https://vitejs.dev/)
- [Vue.js](https://vuejs.org/)
- [TailwindCss](https://tailwindcss.com/)

## ⚖️ | License

Distributed under the MIT License. See `LICENSE` for more information.

---
