# Cards

Display three posts with image, title username and content.

## Notes

**Angular bootup process**

1. Angular loads up each component class file, inspects the 'selector' property
2. Angular then looks at the HTML document that got loaded in the browser
3. `<app-root>` found. Angular finds a component with a matching `selector`
4. Angular turns the instance's template into real HTML, then sticks it into the `app-root` element
5. While inspecting the app's template, Angular sees other elements(`app-card` element in this project)
6. Angular creates an instance of the component
7. Angular turns the instance's template into real HTML, then sticks it into the `app-card` element.

**Set up input binding**<br>
Pass value from parent to child component

1. In the parent component template, find where we create the child component
2. Decide on the property name that we want to use to communicate from the parent to the child
3. Add a new binding to the child component, specifying the data we want to pass down
4. In the child component's `class` file, import `input` property from `@angular/core`. This tells the component to expect the parent to provide the value for this property
5. In the child component's template file, reference the input property.

## How to run

```bash
$ cd cards
$ npm install
$ npm start
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
