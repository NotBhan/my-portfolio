import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
        <Card>
            <CardHeader>
                <CardTitle>Welcome Back!</CardTitle>
                <CardDescription>Here's a quick overview of your portfolio.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>You can manage your projects, skills, and other content from the sidebar.</p>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
            </Header>
            <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold">12</p>
                        <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">25</p>
                        <p className="text-xs text-muted-foreground">Skills</p>
                    </div>
                     <div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-xs text-muted-foreground">Testimonials</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
