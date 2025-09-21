import BentoCard from "@/components/bento-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AdminPage() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <BentoCard
        title="Welcome Back!"
        className="col-span-1"
        showButtons={true}
      >
        <div className="p-4">
          <p className="text-muted-foreground">
            Here's a quick overview of your portfolio. You can manage your
            projects, skills, and other content from the sidebar.
          </p>
        </div>
      </BentoCard>
      <BentoCard title="Quick Stats" className="col-span-1" showButtons={true}>
        <div className="p-4">
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
        </div>
      </BentoCard>
    </div>
  );
}
