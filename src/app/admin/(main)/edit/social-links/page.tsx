import BentoCard from '@/components/bento-card';
import { getSocialLinks } from '@/lib/data';
import SocialLinksForm from './social-links-form';

export default async function EditSocialLinksPage() {
  const socialLinks = await getSocialLinks();
  return (
    <BentoCard title="Edit Social Links" className="col-span-1 md:col-span-2">
      <SocialLinksForm socialLinks={socialLinks} />
    </BentoCard>
  );
}
