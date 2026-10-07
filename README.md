# Repro: `CascadeSelect` ReferenceError under Vitest (`@openng/optimus-ui` 2.0.2)

A minimal Angular 22 app whose unit tests fail as soon as a spec imports `@openng/optimus-ui/cascadeselect`.

## Versions

| Package | Version |
|---|---|
| `@angular/core` / `@angular/build` | 22.2.x |
| `vitest` | 4.1.5 (via `@angular/build:unit-test`, jsdom) |
| `@openng/optimus-ui` | 2.0.2 |
| Node | 24.18.0 (Angular 22 needs `^22.22.3 \|\| ^24.15.0`) |

## Steps to reproduce

```bash
npm install
npm test -- --watch=false
```

On StackBlitz the tests run automatically when the project opens.

## Actual result

Both spec files fail to load, so no tests run:

```
FAIL  src/app/cascade-demo/cascade-demo.spec.ts
FAIL  src/app/app.spec.ts
ReferenceError: Cannot access 'CascadeSelect' before initialization
 ❯ CascadeSelectSub.<static_initializer> node_modules/@openng/src/cascadeselect/cascadeselect.ts:131:29
 ❯ src/app/cascade-demo/cascade-demo.ts:3:1

Test Files  2 failed (2)
     Tests  no tests
```

## Expected result

Both spec files load and all 4 tests pass.

## Cause

`CascadeSelectSub` takes `CascadeSelect` as a constructor parameter, so the compiled factory has
`deps: [{ token: CascadeSelect }]`. That factory is evaluated before `class CascadeSelect` is declared later in the
same module, so loading the module throws. Injecting the parent with `inject(forwardRef(() => CascadeSelect))`
instead of using a constructor parameter fixes it. With that change built locally and installed into this project,
all 4 tests pass.

## Relevant files

- [`src/app/cascade-demo/cascade-demo.ts`](src/app/cascade-demo/cascade-demo.ts): component using `p-cascadeselect`
- [`src/app/cascade-demo/cascade-demo.spec.ts`](src/app/cascade-demo/cascade-demo.spec.ts): the spec that fails to load

Note: the template uses `[options]="$any(countries)"` because `CascadeSelect.options` is typed as
`string[] | string | undefined` in 2.0.2, which rejects an array of option objects. That's a separate typing issue.
