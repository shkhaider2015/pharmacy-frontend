---
inject: true
to: src/components/drawer/DrawerComponent.tsx
before: Drawer Menu Items
---
  {
    label: {t("common:navigation.<%= h.inflection.humanize(h.inflection.camelize(h.inflection.pluralize(name), true)) %>")},
    path: "/admin-panel/<%= h.inflection.transform(name, ['pluralize', 'underscore', 'dasherize']) %>",
    Icon: BusinessIcon,
  },