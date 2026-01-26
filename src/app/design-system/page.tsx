import {
  Button,
  Input,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Badge,
  H1,
  H2,
  H3,
  Body,
  Caption,
} from '@/components/ui';

export default function DesignSystemPage() {
  return (
    <div className="min-h-screen bg-soft-ivory p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        <div>
          <H1 className="mb-4">Design System Components</H1>
          <Body>High-Contrast design system for Marvelring B2B Platform</Body>
        </div>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle>Typography</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <H1>Heading 1</H1>
              <H2>Heading 2</H2>
              <H3>Heading 3</H3>
              <Body>Body text with 18px regular weight and line height 1.6-1.8</Body>
              <Caption>Caption text for smaller information</Caption>
            </div>
          </CardContent>
        </Card>

        {/* Buttons */}
        <Card>
          <CardHeader>
            <CardTitle>Buttons</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg">Primary Button</Button>
              <Button variant="secondary" size="lg">Secondary Button</Button>
              <Button variant="outline" size="lg">Outline Button</Button>
              <Button variant="ghost" size="lg">Ghost Button</Button>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="md">Medium Button</Button>
              <Button variant="primary" size="sm">Small Button</Button>
              <Button variant="primary" disabled>Disabled Button</Button>
            </div>
          </CardContent>
        </Card>

        {/* Inputs */}
        <Card>
          <CardHeader>
            <CardTitle>Input Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Email Address"
              placeholder="Enter your email"
              helperText="We'll never share your email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
            />
            <Input
              label="Business Name"
              placeholder="Your business"
              error="This field is required"
            />
            <Input
              label="Disabled Field"
              placeholder="Cannot edit"
              disabled
            />
          </CardContent>
        </Card>

        {/* Badges */}
        <Card>
          <CardHeader>
            <CardTitle>Badges</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Badge variant="new">NEW</Badge>
              <Badge variant="sale">SALE</Badge>
              <Badge variant="exclusive">B2B EXCLUSIVE</Badge>
              <Badge variant="default">DEFAULT</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Product Card Example */}
        <Card>
          <CardHeader>
            <CardTitle>Product Card</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} variant="product" padding="none">
                  <div className="aspect-[3/4] bg-marble-grey flex items-center justify-center">
                    <Caption>Product Image</Caption>
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <Badge variant="new" size="sm">NEW</Badge>
                    </div>
                    <H3 className="text-base mb-2">Product Name {i}</H3>
                    <Caption>14K/18K Gold Ring</Caption>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle>Color Palette</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <div className="h-20 bg-primary rounded-lg mb-2" />
                <Caption>Primary (Soft Gold)</Caption>
              </div>
              <div>
                <div className="h-20 bg-gold-muted rounded-lg mb-2" />
                <Caption>Gold Muted</Caption>
              </div>
              <div>
                <div className="h-20 bg-charcoal-deep rounded-lg mb-2" />
                <Caption>Charcoal Deep</Caption>
              </div>
              <div>
                <div className="h-20 bg-charcoal-light rounded-lg mb-2" />
                <Caption>Charcoal Light</Caption>
              </div>
              <div>
                <div className="h-20 bg-soft-ivory border border-boutique-silver rounded-lg mb-2" />
                <Caption>Soft Ivory</Caption>
              </div>
              <div>
                <div className="h-20 bg-marble-grey rounded-lg mb-2" />
                <Caption>Marble Grey</Caption>
              </div>
              <div>
                <div className="h-20 bg-pure-white border border-boutique-silver rounded-lg mb-2" />
                <Caption>Pure White</Caption>
              </div>
              <div>
                <div className="h-20 bg-boutique-silver rounded-lg mb-2" />
                <Caption>Boutique Silver</Caption>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
