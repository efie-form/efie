---
applyTo: '**'
---

# Guide: Adding a New Field Type to Efie Form

This guide documents the full workflow for adding a new field type (e.g., phone, email, password, checkbox). Follow these steps whenever introducing a new field so future additions stay consistent and complete.

## 1. Define the Field Type Constant
File: `packages/core/lib/constants/field-type.ts`
- Add the new identifier to the appropriate grouping (input / static / layout / action) and ensure it is included in the aggregated `FieldType` object.

Example:
```ts
export const FormInputType = {
  // ...existing
  PHONE: 'phone',
} as const;
```

## 2. Extend Form Field Type Definitions
File: `packages/core/lib/types/form-field.type.ts`
1. Create a new interface `<Name>FormField` extending `BaseFormField` and (if user-input) `FormInputField`.
2. Declare its `type: typeof FieldType.<NAME>`.
3. Specify its `props` union using existing `FieldSystemProp*` and `FieldCustomProp` types. Only include what the field logically supports (e.g., `LABEL`, `PLACEHOLDER`, `REQUIRED`, `OPTIONS`, etc.).
4. Add the new interface to the `FormField` union.

## 3. (If Needed) Add New System Property Types
If the field requires a new system-level configuration (like `ADDRESS_FIELD` did):
- Add a new entry in `packages/core/lib/property-type.ts`.
- Define its structure in `packages/core/lib/types/field-property-value.type.ts`.
- Add a corresponding `FieldSystemPropX` interface in `packages/core/lib/types/property-definition.ts` and include it in `FieldSystemProp` + related unions.
- Add its config interface in `packages/core/lib/types/settings-config.ts` if it is selectable/configurable in the builder sidebar.

Skip this step if reusing existing system properties.

## 4. Update Settings Config Type Map (Core)
File: `packages/core/lib/types/settings-config.ts`
- If the new field needs a distinct config shape (different prop combination), add an interface like `FieldConfigPhone`.
- Add it to `FieldsConfigsMap`.
- Export the new config types from `packages/core/lib/index.ts`.

## 5. Add Default Field Factory Logic
File: `packages/builder/src/lib/get-default-field.ts`
- Add a new `case FieldType.<NAME>` returning a default object with sensible initial `props`.
- Ensure `GetDefaultFieldReturn` is updated if the `FieldType` key exists there.
- Use appropriate default label / placeholder / options.

## 6. Register Field in Settings Sidebar (Builder)
File: `packages/builder/src/lib/state/settings.state/settings-config.ts`
- Add an entry mapping the field type to its editable properties (e.g., `LABEL`, `PLACEHOLDER`, `REQUIRED`, etc.).
- Include custom property configs if applicable.

## 7. Add Human-Readable Name & Icon
File: `packages/builder/src/lib/constant.ts`
- Add to `FIELDS_NAME` map.

File: `packages/builder/src/lib/fields-tab/fields.ts`
- Add an icon in `fieldIcons`.
- Register in the appropriate group (`inputsGroup`, `staticGroup`, etc.).

## 8. Create Field Render Component
Directory: `packages/builder/src/layouts/main-section/field-contents/fields/`
- Create `<name>-field.tsx` (kebab-case).
- Follow patterns from similar fields:
  - Read editable props via `useSchemaStore((s) => s.getFieldProperty(...))`.
  - Use `updateFieldProperty` to make inline edits (e.g. label changes).
  - Use `getFieldProp` helper for props that don’t change live (e.g. placeholder) when appropriate.
  - Keep UI simple and consistent (label input + rendered input control + required indicator if applicable).

## 9. Export Field Component
File: `packages/builder/src/layouts/main-section/field-contents/fields/index.ts`
- Export the new component.

## 10. Add Switch Case to Render Logic
File: `packages/builder/src/layouts/main-section/field-contents/render-field.tsx`
- Add a `case FieldType.<NAME>` returning the new component.
- Avoid using `any`; cast to the specific field interface if necessary for type narrowing.

## 11. React Runtime Package (If Applicable)
If the runtime `@efie-form/react` package needs awareness:
- Add prop type in `packages/react/types/field-props.ts` (if mirroring existing patterns).
- Add provider mapping (e.g., `<FieldTypeName>Provider`) if following provider architecture.
- Update README usage examples if public.

## 12. Tests
Add or extend tests to cover:
- Default field creation (ensure schema shape correct).
- Builder rendering (basic smoke test if present in existing test patterns).
- Property updates via state store (e.g., label change).
- Validation rules if added.

Suggested locations:
- Core logic: `packages/core/__tests__/`
- Builder UI: `packages/builder/src/__tests__/`

## 13. Documentation
- Update root or package-level `README.md` if the field is user-facing.
- Mention any new system property in documentation related to property configuration.

## 14. Lint & Type Check
Run:
```
pnpm lint
pnpm type:check (or equivalent script)
```
Fix all issues before committing.

## 15. Commit & PR
Use a conventional commit message:
```
feat: add <field name> field type
```
Include screenshots / notes if UI related.

## 16. Post-Add Checklist
- [ ] FieldType constant added
- [ ] Interface + union update
- [ ] Default factory case
- [ ] Settings config (core + builder)
- [ ] FIELDS_NAME + icon + fields tab
- [ ] Field component + export
- [ ] Render switch case
- [ ] React runtime (if needed)
- [ ] Tests added / updated
- [ ] Docs updated
- [ ] Lint & types pass

## 17. Patterns Reference
Look at these existing fields for guidance:
- Simple input (label + placeholder): `short-text`, `email`
- Toggle-like (single boolean): `checkbox`
- Structured composite: `address`

## 18. Avoid These Pitfalls
- Do not introduce `any`; widen with discriminated unions.
- Do not forget to export new config types from `core/lib/index.ts`.
- Avoid duplicating existing system properties when a generic one fits.

---
Following this guide ensures consistency, type safety, and full integration across schema, builder UI, and runtime rendering.
