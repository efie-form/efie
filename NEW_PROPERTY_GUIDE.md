# Adding a New Property Setting (Checklist)

Follow this sequence whenever you introduce a new system property for fields.

## 1. Define Property Type
- Add constant in `packages/core/lib/property-type.ts`
```
export const PropertyType = { ... , MY_PROP: 'my_prop', ... } as const;
```

## 2. Extend Value Types (If Needed)
- If a new structured value is required, extend `field-property-value.type.ts`.
```
export interface PropValueMyProp { ... }
export type PropValue = | ... | PropValueMyProp;
```
- Add validator (optional) in `utils/value-validator.ts` and export from `core/lib/index.ts`.

## 3. Property Definition Interface
- In `types/property-definition.ts` add interface:
```
export interface FieldSystemPropMyProp { type: typeof PropertyType.MY_PROP; value: PropValueMyProp; }
```
- Add it to `FieldSystemProp` union.

## 4. Settings Config Type Support
- In `types/settings-config.ts` create:
```
export interface FieldSystemConfigMyProp { type: typeof PropertyType.MY_PROP; label: string; }
```
- Add to `FieldSystemConfig` union.
- Insert into the appropriate `FieldConfig<...>` interface (e.g., `FieldConfigPassword`).

## 5. Runtime Schema Defaults
- In `builder/src/lib/get-default-field.ts` add a default property object when constructing the field.

## 6. Settings Panel Mapping
- In `builder/src/lib/state/settings.state/settings-config.ts` include the new property inside the field type `properties` array.

## 7. UI Component
- Create a component under `builder/src/layouts/right-bar/system-settings/` named `system-settings-my-prop.tsx`.
  - Fetch existing value: `useSchemaStore(state => state.getFieldProperty(fieldId, config.type))`.
  - Update via `updateFieldProperty(fieldId, { type: config.type, value: next })`.
  - Use existing layout wrappers (`SettingsFieldVertical` / `SettingsFieldHorizontal`).

## 8. Wire Into Field Settings Switch
- In `builder/src/layouts/right-bar/field-settings.tsx` add a new `case PropertyType.MY_PROP:` returning your component.

## 9. Export Types / Validators
- Ensure `core/lib/index.ts` exports: the value type, system prop interface, config interface, validator (if any).

## 10. Adjust Form Field Type (if property appears in field instance)
- In `types/form-field.type.ts` add the system prop interface to the field's `props` union.

## 11. Tests (Optional but Recommended)
- Add unit test for validator and update logic.

## 12. Default Generator & Migration
- If existing schemas must gain the new property, write a migration script or handle absence gracefully in UI.

## 13. Lint & Type Check
- Run type checking to ensure no errors.

## Example: PASSWORD_POLICY done in this branch.

Order of touched files (for reference):
1. core/lib/property-type.ts
2. core/lib/types/field-property-value.type.ts
3. core/lib/types/property-definition.ts
4. core/lib/types/settings-config.ts
5. core/lib/types/form-field.type.ts
6. core/lib/utils/value-validator.ts (+ export)
7. core/lib/index.ts
8. builder/src/lib/state/settings.state/settings-config.ts
9. builder/src/lib/get-default-field.ts
10. builder/src/layouts/right-bar/system-settings/system-settings-password-policy.tsx
11. builder/src/layouts/right-bar/field-settings.tsx
12. NEW_PROPERTY_GUIDE.md

Done.
