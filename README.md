## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve psam
```

To create a production bundle:

```sh
npx nx build psam
```

To see all available targets to run for a project, run:

```sh
npx nx show project psam
```

## Add new projects

To generate a new application, use:

```sh
npx nx g @nx/angular:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/angular:lib mylib
```
