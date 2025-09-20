import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Dashboard</CardTitle>
          <CardDescription>Welcome to your control panel.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">You have successfully logged in.</p>
          <form action="/api/auth/logout" method="post">
            <Button type="submit" variant="destructive" className="w-full">
              Logout
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
