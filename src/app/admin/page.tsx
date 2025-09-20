import { redirect } from 'next/navigation';

export default function AdminPage() {
  // Default to the projects page
  redirect('/admin/projects');
}
