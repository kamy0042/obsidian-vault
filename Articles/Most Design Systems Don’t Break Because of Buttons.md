---
title: "Most Design Systems Don’t Break Because of Buttons"
source: "https://medium.com/design-systems-collective/most-design-systems-dont-break-because-of-buttons-016ae786dc07"
author:
  - "[[Sedrak]]"
published: 2026-06-13
created: 2026-07-26
description: "More"
tags:
  - topic/デザインシステム/コンポーネント設計
  - topic/デザインシステム/デザイントークン
  - topic/技術/フロントエンド
---
Why design systems fail as products scale — and why boundaries matter more than reusable components.

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*4k7pv3wAz-_ama_Yt9BcGg.png)

A design system almost always starts beautifully.

There is a clean Figma library. There is `Button`, `Input`, `Modal`, `Typography`. There are tokens, Storybook, and a few confident people saying, “Now we’ll finally stop rebuilding UI from scratch.”

For the first few months, it actually works.

Teams ship screens faster. Designers argue less about border radii. Frontend stops living in a world of random `#1976d2`, `margin-top: 13px`, and buttons that resemble each other only emotionally.

Then the product grows.

A second product appears. Then a mobile app. Then an enterprise customer with custom branding. Then an accessibility audit. Then legal asks for a new warning state. Then sales sells white-label before engineering finds out that white-label now exists.

One day, you change `Card` padding from `16px` to `24px` because the main dashboard looks better. An hour later, dense tables are broken, modals no longer fit on small screens, and the visual regression suite looks like the UI committed a crime.

Suddenly, the design system that was supposed to simplify development becomes another layer of complexity.

> *A good design system does not die from a lack of components. It dies from trying to be universal everywhere.*

This is not about how to build a `Button` from scratch. This is about why design systems break in real products, when different teams, platforms, brands, requirements, and actual users start pushing against them.

## Why Design Systems Look Perfect at First

At the beginning, design systems tend to operate in controlled environments.

There is one main product, one brand, one platform, and a small group of people who can agree faster than they can write an RFC.

Components look simple:

```c
import { Button } from '@package-ui';

export function BillingActions() {
  return (
    <Button variant="primary" size="md">
      Pay invoice
    </Button>
  );
}
```

Tokens look good too:

```c
export const tokens = {
  color: {
    blue500: '#2563eb',
    gray100: '#f3f4f6',
    gray900: '#111827',
    red500: '#ef4444',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};
```

Everything is clear. Everything is transparent. Everything can be explained in five minutes.

Components look especially convincing in Storybook, because Storybook rarely shows the real pain: long German strings, RTL, permission-based UI, legacy layout, nested modals, tables with 80 columns, banking statuses, and a screen that must work on an iPad inside a browser running through a corporate VPN.

The problem is that early simplicity is often mistaken for proof of good architecture.

In reality, it proves only one thing: the system has not met real scale yet.

## The First Compromises

The first compromises almost never look dangerous.

They arrive as small, reasonable requests.

Typical requests start showing up:

\- Add \`compact\` mode for tables.  
\- Make the secondary button darker in Billing.  
\- Support a custom primary color for an enterprise client.

Each request sounds harmless.

Sometimes it really is.

The problem starts when the design system answers every request with a new flag.

```c
type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  fullWidthOnMobile?: boolean;
  compact?: boolean;
  rounded?: boolean;
  uppercase?: boolean;
  loading?: boolean;
  iconOnly?: boolean;
  marketing?: boolean;
  billing?: boolean;
  admin?: boolean;
  highContrast?: boolean;
  disableHoverEffect?: boolean;
};
```

This is no longer a component API. It is an archaeological layer of product compromises.

The unpleasant part is that nobody did anything obviously stupid. Every decision was locally rational. The system simply started accumulating context that does not belong to it.

`Button` should not know that it is used in Billing. It should not know that the marketing team likes larger border radii. It should not know that the admin panel is denser than the consumer product.

When a base component starts storing product history, it stops being base.

> *A component with twenty boolean flags is not flexible. It just has not admitted that it is several components yet.*

A healthier approach usually looks more boring, but lasts longer:

```c
type ButtonProps = {
  intent?: 'accent' | 'neutral' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: React.ReactNode;
};
```

Product-specific meaning moves one layer up:

```c
function BillingPrimaryAction(props: ButtonProps) {
  return <Button intent="accent" size="md" {...props} />;
}

function TableInlineAction(props: ButtonProps) {
  return <Button intent="neutral" size="sm" {...props} />;
}
```

Yes, this is duplication. **But it is useful duplication.**

It keeps the base component clean and moves product semantics to the place where they actually live.

## Scaling Problems

Scaling breaks not components, but assumptions.

At the beginning, teams often assume that all products share one visual language, the brand will remain stable, designers will follow the rules, overrides will stay rare, and components can be made flexible enough to cover almost every scenario.

In production, these assumptions quickly become indecent.

Imagine a company with several products:

- SaaS dashboard for enterprise customers
- Public marketing site
- Internal admin tool
- Mobile application
- Embedded widgets for partners
- White-label version for large customers

All of them are supposed to “use the same design system.”

On a slide, this sounds great. In code, it often becomes a monolithic UI package where every component tries to serve every possible scenario.

```c
<Button
  variant="primary"
  size="large"
  density="compact"
  brand="partner"
  platform="web"
  surface="dark"
  product="dashboard"
  emphasis="high"
  mobileBehavior="fullWidth"
>
  Continue
</Button>
```

This API looks powerful until you try to understand which combinations are allowed.

Can `density="compact"` be used with `size="large"`?  
Can `surface="dark"` be used for `brand="partner"`?  
What has priority: `variant`, `intent`, or `emphasis`?  
Why does the button look different in mobile web than in React Native?  
Who tests this?

The answer is usually uncomfortable: nobody fully does.

The component matrix grows faster than the team’s ability to maintain it.

If a button has 4 variants, 3 sizes, 2 densities, 3 brands, 2 themes, 4 states, and 2 platforms, that is no longer “a few variants.” That is hundreds of combinations.

And that is only the button. There are also inputs, selects, tables, menus, dialogs, date pickers, navigation, charts, and the wonderful world of enterprise forms, where a field can simultaneously be disabled, required, invalid, readonly, masked, async-validating, and “editable only by users with the regional manager role.”

Scaling requires clear boundaries, not infinite flexibility.

A weak design system thinks it must support everything. A healthy design system knows where its responsibility ends.

## Token Hell

Tokens begin as a cure for chaos.

Instead of random colors, variables appear:

```c
export const primitive = {
  color: {
    blue: {
      50: '#eff6ff',
      500: '#2563eb',
      700: '#1d4ed8',
    },
    gray: {
      50: '#f9fafb',
      100: '#f3f4f6',
      700: '#374151',
      900: '#111827',
    },
    red: {
      500: '#ef4444',
      700: '#b91c1c',
    },
  },
};
```

This is better than raw values in CSS. But it is not a design system yet. It is a color catalog.

The first problems begin when these tokens are used directly in components:

```c
const Card = styled('div')(({ theme }) => ({
  backgroundColor: theme.tokens.color.gray100,
  color: theme.tokens.color.gray900,
  border: \`1px solid ${theme.tokens.color.gray300}\`,
}));
```

At first, this is fine. Then dark mode appears. Then high contrast. Then brand themes. Then warning surfaces. Then product-specific navigation. Suddenly, `gray100` no longer means “card background.” It means “some light gray someone once used as a card background.”

Palette tokens are useful, but they do not express intent.

It is better to separate primitive tokens from semantic tokens.

```c
export const semantic = {
  color: {
    text: {
      primary: primitive.color.gray[900],
      secondary: primitive.color.gray[700],
      danger: primitive.color.red[700],
    },
    surface: {
      page: primitive.color.gray[50],
      card: '#ffffff',
      elevated: '#ffffff',
    },
    border: {
      subtle: primitive.color.gray[100],
      strong: primitive.color.gray[700],
    },
    action: {
      primary: {
        background: primitive.color.blue[500],
        backgroundHover: primitive.color.blue[700],
        foreground: '#ffffff',
      },
      danger: {
        background: primitive.color.red[500],
        backgroundHover: primitive.color.red[700],
        foreground: '#ffffff',
      },
    },
  },
};
```

Now the component does not say “give me blue500.” It says “give me the primary action background color.”

```c
const PrimaryButton = styled('button')(({ theme }) => ({
  backgroundColor: theme.semantic.color.action.primary.background,
  color: theme.semantic.color.action.primary.foreground,

  '&:hover': {
    backgroundColor: theme.semantic.color.action.primary.backgroundHover,
  },
}));
```

This seems obvious. But in real systems, token hell usually starts not because semantic tokens are missing, but because the semantics are bad.

For example:

```c
const tokens = {
  color: {
    primary: '#2563eb',
    secondary: '#64748b',
    tertiary: '#94a3b8',
  },
};
```

Primary what? Text? Background? Brand? Button? Link? Chart accent? Primary in light theme or dark theme?

These tokens look semantic, but they are really just renamed primitives.

It is even worse when the entire system becomes a collection of component tokens:

```c
const tokens = {
  buttonPrimaryBackground: '#2563eb',
  buttonPrimaryHoverBackground: '#1d4ed8',
  buttonPrimaryText: '#ffffff',
  inputBorderDefault: '#d1d5db',
  inputBorderError: '#ef4444',
  modalHeaderBackground: '#ffffff',
};
```

Component tokens are sometimes necessary. But if the whole system consists only of them, you quickly get a giant JSON file that nobody fully understands.

A healthier token architecture is usually layered:

```c
type Theme = {
  primitive: PrimitiveTokens;
  semantic: SemanticTokens;
  component: ComponentTokens;
};
```

Primitive tokens are rarely used directly in product code.

Semantic tokens are used for most layout and product UI.

Component tokens are used where a component truly needs precise tuning.

```c
export const buttonTokens = {
  primary: {
    background: '{color.action.primary.background}',
    foreground: '{color.action.primary.foreground}',
    border: 'transparent',
  },
  secondary: {
    background: '{color.surface.card}',
    foreground: '{color.text.primary}',
    border: '{color.border.subtle}',
  },
};
```

The important thing is not to turn this into religion.

Sometimes a component token is needed. Sometimes a semantic token is enough. Sometimes local CSS is simpler, because tokenizing a one-off spacing value creates more noise than value.

> *Not every* `*padding: 12px*` *needs to become part of the company’s cultural heritage.*

Token hell begins when a team tries to tokenize everything without distinguishing system-level decisions from local details.

## MUI Override Nightmare

MUI is often chosen not because it is perfect, but because it already solves 70% of boring problems: accessibility, keyboard navigation, focus management, popper logic, inputs, menus, dialogs, tables.

That is a pragmatic choice. Especially for enterprise products.

But MUI becomes dangerous when a team tries to build a “fully custom” design system on top of it while ignoring its architecture.

First, you change a few global theme values. Then you add an override for `MuiButton`. Then a new variant. Then `danger`, `neutral`, `compact`, dark theme, loading state, icon-only behavior, special focus ring, and mobile density.

A year later, `theme.ts` looks like a place where CSS goes to serve time.

```c
const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState, theme }) => ({
          textTransform: 'none',
          borderRadius: 8,

          ...(ownerState.variant === 'contained' && {
            boxShadow: 'none',
          }),

          ...(ownerState.size === 'large' && {
            height: 48,
            paddingInline: theme.spacing(3),
          }),
        }),
      },
      variants: [
        {
          props: { variant: 'soft' },
          style: {
            backgroundColor: '#eff6ff',
            color: '#1d4ed8',
          },
        },
      ],
    },
  },
});
```

The main problem with MUI overrides is not that they are bad. The problem is that they are global, cascading, and often implicit.

A product component looks like this:

```c
<Button variant="contained" color="primary">
  Save
</Button>
```

But its actual appearance lives in MUI defaults, global theme overrides, custom variants, `sx`, wrapper components, and sometimes a nearby CSS module because “nothing else worked.”

One `sx` override is fine. A hundred identical `sx` overrides is no longer customization. It is a distributed design system with no owner.

```c
<Button
  variant="contained"
  color="primary"
  sx={{
    height: 36,
    borderRadius: 999,
    px: 2,
    boxShadow: 'none',
  }}
>
  Invite user
</Button>
```

A better approach is to create a thin wrapper that translates product language into MUI primitives:

```c
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

type AppButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';

type AppButtonProps = Omit<MuiButtonProps, 'variant' | 'color'> & {
  variant?: AppButtonVariant;
};

const variantToMuiProps: Record<
  AppButtonVariant,
  Pick<MuiButtonProps, 'variant' | 'color'>
> = {
  primary: { variant: 'contained', color: 'primary' },
  secondary: { variant: 'outlined', color: 'primary' },
  danger: { variant: 'contained', color: 'error' },
  ghost: { variant: 'text', color: 'primary' },
};

export function AppButton({
  variant = 'primary',
  disableElevation = true,
  ...props
}: AppButtonProps) {
  return (
    <MuiButton
      {...variantToMuiProps[variant]}
      disableElevation={disableElevation}
      {...props}
    />
  );
}
```

This does not mean every MUI component must be wrapped automatically. Direct MUI usage is sometimes fine. But if a component is part of the public API of your design system, the product should not depend on MUI’s internal naming conventions.

The same applies to `sx`: you do not need to ban it completely, but you do need to agree on where it is acceptable.

```c
<AppButton
  variant="primary"
  sx={{ mt: 2 }}
>
  Save
</AppButton>
```

A local layout spacing override is acceptable.

This is a warning sign:

```c
<AppButton
  variant="primary"
  sx={{
    backgroundColor: '#111827',
    color: '#f9fafb',
    borderRadius: 2,
  }}
>
  Save
</AppButton>
```

Here the product is overriding the visual identity of the component. Maybe a new variant is needed. Maybe a local component is needed. Maybe design is trying to solve a product problem with random CSS.

MUI works well when you accept it as a platform with its own rules.

MUI works poorly when you pretend it is just a set of divs that must obey your perfect Figma UI kit.

## False Reusability

One of the most expensive design system mistakes is believing that reuse is always good.

In practice, reuse comes in different forms.

There is healthy reuse:

```c
<TextField
  label="Email"
  value={email}
  onChange={setEmail}
  error={emailError}
/>
```

Here the component encapsulates repeated mechanics: label, input, error message, focus, disabled state, accessibility attributes.

And there is false reuse:

```c
<UserCard
  user={user}
  showBillingStatus
  showLastLogin
  showTeamRole
  showSubscriptionBadge
  showComplianceWarning
  compact={isSidebar}
  interactive={canOpenDetails}
  mode="admin"
/>
```

It looks like one `UserCard`. In reality, it is several product scenarios stitched into one component.

In one project, we reached a point where `Button` had more than 30 props and several brand-specific exceptions. Nobody on the team could confidently say which combinations were officially supported. Can `compact` be used with `loading`? What about `danger` with `ghost` in dark theme? The answer was roughly: “Better not touch it, it works right now.”

That is the smell of false reusability.

The problem is not only visual complexity. The problem is that this component starts changing behavior depending on prop combinations.

```c
function UserCard({
  user,
  showBillingStatus,
  showLastLogin,
  showComplianceWarning,
  compact,
  interactive,
  mode,
}: UserCardProps) {
  return (
    <Card>
      <UserAvatar user={user} />
      <UserName user={user} />

      {showBillingStatus && <BillingStatus userId={user.id} />}

      {showLastLogin && !compact && (
        <LastLogin value={user.lastLoginAt} />
      )}

      {showComplianceWarning && mode === 'admin' && (
        <ComplianceWarning user={user} />
      )}

      {interactive && <OpenDetailsButton userId={user.id} />}
    </Card>
  );
}
```

This is not a reusable component. This is a conditional rendering warehouse.

A better approach is to separate layout primitives from product composition.

```c
function UserSummaryLayout({
  avatar,
  title,
  subtitle,
  meta,
  actions,
}: {
  avatar: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  meta?: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <Card>
      <Stack direction="row" spacing={2} alignItems="center">
        {avatar}

        <Box minWidth={0} flex={1}>
          <Typography variant="body1" noWrap>
            {title}
          </Typography>

          {subtitle && (
            <Typography variant="body2" color="text.secondary" noWrap>
              {subtitle}
            </Typography>
          )}

          {meta}
        </Box>

        {actions}
      </Stack>
    </Card>
  );
}
```

Now product logic lives in the product:

```c
function AdminUserCard({ user }: { user: User }) {
  return (
    <UserSummaryLayout
      avatar={<UserAvatar user={user} />}
      title={user.name}
      subtitle={user.email}
      meta={<ComplianceStatus user={user} />}
      actions={<OpenUserMenu user={user} />}
    />
  );
}

function BillingUserCard({ user }: { user: User }) {
  return (
    <UserSummaryLayout
      avatar={<UserAvatar user={user} />}
      title={user.name}
      subtitle={<BillingStatus userId={user.id} />}
      actions={<ManageSubscriptionButton user={user} />}
    />
  );
}
```

Yes, now there are two components. That is fine.

Duplicating structure is sometimes cheaper than maintaining a universal component nobody can safely change.

> *The most reused component in the system is often the one everyone is afraid to touch.*

Universality has hidden costs: it is harder to test, type, document, change, and delete. More importantly, after a while nobody understands who owns the behavior.

In enterprise products, this is especially visible. UI depends on permissions, regions, plans, feature flags, customer-specific settings, and legacy business rules.

If all of this is hidden inside the design system, it quickly becomes a second backend, only worse: no transactions, no data schema, and nobody willing to admit it is a backend.

## One Button for Every Product

The idea of “one button for every product” sounds reasonable.

At the level of basic mechanics, it is. A button should have focus state, disabled state, loading state, an accessible name, the right cursor, and reasonable hit targets.

But visually and product-wise, buttons live in different contexts.

A marketing page wants a large expressive button.  
An admin panel wants a dense button that does not break the table.  
Mobile web wants a full-width primary action at the bottom of the screen.  
An enterprise customer wants their brand color, but accessibility says “no.”  
An embedded widget wants to inherit the partner container’s constraints.

If all of this goes into one API, you get a monster.

It is better to think in layers.

```c
type ButtonBaseProps = {
  disabled?: boolean;
  loading?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode;
};

type ButtonProps = ButtonBaseProps & {
  intent?: 'accent' | 'neutral' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  emphasis?: 'solid' | 'outline' | 'ghost';
};
```

The product layer should express the domain:

```c
function ApproveInvoiceButton({
  invoiceId,
}: {
  invoiceId: string;
}) {
  const approveInvoice = useApproveInvoice();

  return (
    <Button
      intent="accent"
      emphasis="solid"
      size="sm"
      onClick={() => approveInvoice(invoiceId)}
    >
      Approve
    </Button>
  );
}
```

The button should not know that it is inside a sticky bottom bar or a dense table. That is the responsibility of layout composition and the product layer.

When interaction mechanics, visual language, product semantics, layout context, and platform-specific behavior are mixed inside one component, the system becomes fragile.

## Branding, Accessibility, and Product Conflicts

In mature products, UI decisions rarely have a single owner.

Brand wants recognizability. Product wants conversion. Accessibility wants contrast and keyboard navigation. Enterprise customers want their own color. Engineering does not want to support 18 themes with manual exceptions. Leadership wants it to “look like the competitor, but unique.”

All of these requirements land in the design system.

A common example: the brand primary color does not pass WCAG contrast for button text.

```c
const brand = {
  primary: '#4f7cff',
};

const button = {
  background: brand.primary,
  foreground: '#ffffff',
};
```

Visually nice. Insufficient contrast.

Bad reaction:

```c
const button = {
  background: brand.primary,
  foreground: '#ffffff',
  accessibilityFixForEnterpriseClient: '#0f172a',
};
```

At this point, you can already see the system negotiating with reality through strange names.

A better approach is to define a theme contract upfront:

```c
type ActionColor = {
  background: string;
  foreground: string;
  backgroundHover: string;
  focusRing: string;
};

type ThemeContract = {
  color: {
    action: {
      primary: ActionColor;
      danger: ActionColor;
    };
  };
};
```

And validate the theme as an engineering artifact, not as JSON with good intentions.

```c
import { getContrastRatio } from '@mui/material/styles';

function assertActionColorAccessible(color: ActionColor) {
  const contrast = getContrastRatio(color.background, color.foreground);

  if (contrast < 4.5) {
    throw new Error(
      \`Primary action contrast is ${contrast.toFixed(2)}. Minimum expected is 4.5.\`,
    );
  }
}
```

This can run in CI for every brand theme.

```c
describe.each(Object.entries(themes))('%s theme', (_, theme) => {
  it('has accessible primary action colors', () => {
    assertActionColorAccessible(theme.color.action.primary);
  });
});
```

Yes, someone will say, “But design wants exactly this color.”

Great. Then the decision must be explicit: change the foreground, darken the background, use an outline variant, or admit that this brand color is not suitable for an interactive primary action.

A design system should not silently become a landfill of compromises. It should make conflicts visible.

## Why This Happens Technically and Organizationally

Technical problems in design systems almost always have organizational causes.

A component gets extra props not because TypeScript is weak, but because there is no clear process for deciding whether something is a system need or a local product detail.

Tokens grow uncontrollably not because JSON is bad, but because nobody owns semantics.

MUI overrides become a nightmare not because MUI is terrible, but because the team wants both the speed of a ready-made library and full control over the visual language.

Universal components appear not because engineers enjoy suffering, but because organizations often reward “reuse” and rarely account for maintenance cost.

## The Design System as a Service Team

The design system team often becomes a ticket queue.

A product team says, “We need a new Select variant.”  
The DS team adds it.  
Another team asks for one more.  
A third team asks for an exception.  
A year later, `Select` supports 11 modes, 4 of which are used by one screen.

The problem here is ownership.

If the design system only takes orders, it gradually turns into a shared warehouse of UI exceptions.

A mature DS team must be allowed to say:

- this should live in the product
- this should be solved through composition
- this violates accessibility
- this will not be added to core
- this can be an experimental package
- this requires changing the token model

Yes, it is less convenient. But the system stays alive.

## Figma Is Not the Only Source of Truth

“Figma is the source of truth” sounds nice until you start maintaining UI in production.

Figma does not know about loading state after optimistic updates, Android system fonts, browser zoom at 125%, a data grid with 10,000 rows, customer theme loading after authorization, or scroll inside a dialog inside a legacy shell.

Figma matters. But production UI lives in code.

For a design system, source of truth should be distributed:

- Figma for visual decisions and design contracts
- Code for behavior, accessibility, and runtime constraints
- Storybook for interactive state verification
- Tests for regressions and contracts
- Documentation for usage rules and responsibility boundaries

If one of these layers is missing, the others start lying.

## Design System Changes Are API Changes

Design systems break painfully when changes are shipped as “just UI.”

For example, a team changes the default spacing in `Card`:

```c
<Card>
  <CardContent>
    ...
  </CardContent>
</Card>
```

It was `padding: 16px`, now it is `padding: 24px`.

One product looks better. Another breaks dense tables. A third has a modal that no longer fits on a small screen. A fourth turns visual tests red.

Even visual changes require engineering discipline:

- changelog
- migration notes
- codemods where possible
- visual regression tests
- deprecation strategy
- clear breaking-change policy

Without this, the design system becomes a source of random earthquakes.

## Signs Your Design System Is Already in Trouble

`Button` has more than 15 props.

Teams regularly override components through `sx`, `className`, or local CSS.

Nobody knows the full list of officially supported variants.

`theme.ts` grows faster than the number of components.

Changing one base component requires manually checking several products.

Design reviews discuss exceptions more often than patterns.

Everything looks good in Storybook, but every second production screen contains a local override.

The design system team has become a team that takes requests for new props.

This does not mean everything is lost. But it does mean the system has stopped being just a component library. It has become an architectural dependency, and it should be treated accordingly.

## How to Build Healthier Design Systems

A healthy design system does not have to be perfect. It has to be honest about its boundaries.

## Separate Core, Product, and Experimental

Not everything should go into core.

A good package structure can look like this:

```c
packages/
  ui-core/
    Button/
    TextField/
    Dialog/
    tokens/
  ui-product-dashboard/
    DashboardHeader/
    DataTableToolbar/
    UserStatusBadge/
  ui-product-billing/
    InvoiceStatus/
    PaymentMethodCard/
  ui-experimental/
    NewSelect/
    CommandMenu/
```

`ui-core` contains stable primitives and system components.  
`ui-product-*` contains domain-specific compositions.  
`ui-experimental` allows ideas to be tested without promising eternal support.

This reduces pressure on core.

Not every new UI element must become part of the permanent public API.

## Keep APIs Narrow but Composable

A bad API tries to predict everything:

```c
<EmptyState
  title="No invoices"
  description="Create your first invoice"
  showIcon
  iconName="invoice"
  primaryActionLabel="Create invoice"
  onPrimaryAction={handleCreate}
  secondaryActionLabel="Import"
  onSecondaryAction={handleImport}
  layout="centered"
  compact
  withBorder
/>
```

It is better to give the component structure and let the product compose the content:

```c
<EmptyState>
  <EmptyState.Icon>
    <InvoiceIcon />
  </EmptyState.Icon>

  <EmptyState.Title>No invoices</EmptyState.Title>

  <EmptyState.Description>
    Create your first invoice or import existing billing data.
  </EmptyState.Description>

  <EmptyState.Actions>
    <Button intent="accent" onClick={handleCreate}>
      Create invoice
    </Button>

    <Button intent="neutral" emphasis="ghost" onClick={handleImport}>
      Import
    </Button>
  </EmptyState.Actions>
</EmptyState>
```

Yes, this is more JSX. But there is less API magic.

Composition is often better than another prop.

## Do Not Fear Local Duplication

Engineers often remove duplication too early.

Two similar cards in different products do not always need to become one universal card. Sometimes they are similar by accident. Sometimes they are similar today and diverge in two months.

A simple rule:

If two UI fragments look the same but have different reasons to change, do not rush to merge them.

```c
function SubscriptionPlanCard() {
  ...
}

function TeamMemberCard() {
  ...
}
```

This can be better than:

```c
function UniversalCard({ type, user, plan, billing, permissions }) {
  ...
}
```

Duplicating lines is cheaper than duplicating responsibility inside one component.

## Control Escape Hatches

Escape hatches are necessary. Without them, product teams will bypass the system in worse ways.

But an escape hatch must be visible.

For example, you can allow `sx`, but lint raw colors:

```c
<Button
  sx={{
    color: '#ffffff',
    backgroundColor: '#2563eb',
  }}
>
  Save
</Button>
```

Better:

```c
<Button
  sx={(theme) => ({
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
  })}
>
  Save
</Button>
```

Even better: if this repeats, add a system variant or a product component.

An escape hatch should be a door with a sign, not a hole in the wall.

## Test Contracts

A design system needs tests for behavior and visual contracts.

For a button, it is not enough to test that children render.

```c
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

it('does not call onClick while loading', async () => {
  const onClick = vi.fn();

  render(
    <Button loading onClick={onClick}>
      Save
    </Button>,
  );

  await userEvent.click(screen.getByRole('button'));

  expect(onClick).not.toHaveBeenCalled();
});
```

Themes should be tested for accessibility:

```c
it('keeps danger action accessible', () => {
  const danger = theme.color.action.danger;

  expect(
    getContrastRatio(danger.background, danger.foreground),
  ).toBeGreaterThanOrEqual(4.5);
});
```

Without contracts, design system changes spread like rumors: quickly, unpredictably, and with distortion.

## Document Boundaries, Not Just Props

Most design system documentation answers the question “how do I use this component?”

In production, the more important question is “when should I not use this component?”

Good documentation for `Dialog` should say:

- use it for blocking decisions
- do not use it for complex multi-step flows
- do not nest dialog inside dialog
- use `MobileSheet` for mobile full-screen flows
- use `ConfirmDialog` for destructive confirmation
- if the content requires scroll inside scroll, reconsider the UX

This is not academia. This is future time saved.

Components break not only because of incorrect code. They break because of incorrect expectations.

## Accept Platform Differences

Web and mobile do not need the same UI API.

You can have a shared token layer and separate platform components.

```c
packages/
  design-tokens/
  ui-web/
  ui-mobile/
```

React Native and web have different constraints: typography rendering, shadows, gestures, focus model, keyboard behavior, safe areas, platform conventions, and performance profile.

Trying to build one universal `Modal` for web and mobile often ends with a component that is equally awkward everywhere.

Shared principles: yes.  
Shared tokens: often yes.  
The exact same component API: not always.

A mature system does not pretend platforms are identical.

## Architecture Snapshot

A weak architecture often looks like this:

```c
src/
  theme.ts
  components/
    Button.tsx
    Select.tsx
    Modal.tsx
  pages/
    billing/
      BillingPage.tsx
    admin/
      UsersPage.tsx
```

`theme.ts` is huge.  
`Button.tsx` knows about billing.  
`Select.tsx` contains 12 modes.  
`pages` use `sx` for everything the design system could not express.

A healthier structure:

```c
src/
  design-system/
    tokens/
      primitive.ts
      semantic.ts
      themes.ts
      validateTheme.ts
    mui/
      createAppTheme.ts
      componentOverrides.ts
    components/
      Button/
        Button.tsx
        Button.test.tsx
        Button.stories.tsx
      TextField/
      Dialog/
  product-ui/
    billing/
      BillingActionButton.tsx
      InvoiceStatusBadge.tsx
    admin/
      UserTableAction.tsx
      RoleBadge.tsx
```

Usually, dependency should flow bottom-up:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*odpyp3x_gwBV98AZ_kHiBw.png)

And responsibility in code should read roughly like this:

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*O897BkLAzGMjTJKQqug0tA.png)

MUI remains infrastructure.  
The design system provides language.  
Product UI expresses the domain.  
Screens assemble scenarios.

This is not a perfect architecture. But it has one important quality: responsibility is visible.

## Quick Diagnosis

If any of the following feel familiar, your design system is probably carrying more responsibility than it should.

`**Button**` **has 20+ props**

Product context has leaked into core components.

A healthier response: create product wrappers or separate composition layers.

**Raw colors appear in** `**sx**`

The token contract is missing or inconvenient.

A healthier response: introduce semantic tokens or create a new variant.

**One** `**Card**` **serves five different flows**

False reusability has started replacing clear boundaries.

A healthier response: separate layout primitives from product composition.

`**theme.ts**` **keeps growing**

MUI overrides have become a hidden API.

A healthier response: use thin wrappers and explicit contracts.

**Figma and code diverge**

The source of truth exists only in theory.

A healthier response: treat Figma, code, tests, and documentation as a distributed contract.

**Components are scary to change**

Responsibility boundaries have become too broad.

A healthier response: split core behavior from product behavior.

## Final Thoughts

Most design systems do not fail because their `Button` is bad.

They fail because they try to be a visual language, component library, branding engine, accessibility layer, product framework, and replacement for engineering judgment at the same time.

That is too much for one abstraction.

A good design system does not promise that every screen can be assembled from ten universal components.

It promises something else: shared decisions will truly be shared, product decisions will stay in the product, and the boundaries between them will be clear enough for the system to survive for years.

Most design systems do not die at the moment they are created.

They die gradually.

With every new flag.  
With every new exception.  
With every new “this is only for one customer.”  
With every change that “definitely won’t break anything.”

And one day, the team realizes it is no longer maintaining a design system. It is maintaining a collection of historical compromises.

For this, tokens, components, and Storybook are not enough.

You need ownership, versioning, architectural boundaries, honesty about platforms, respect for accessibility, and the willingness to sometimes say: “No, this should not be part of core.”

It is not always pleasant. But it works.

> *A scalable design system is not the one where everything is reused. It is the one where everyone understands what is worth reusing, and what is better kept separate.*