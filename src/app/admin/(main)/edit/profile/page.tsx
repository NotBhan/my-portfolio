import BentoCard from '@/components/bento-card';
import { getProfile } from '@/lib/data';
import ProfileForm from './profile-form';

export default async function EditProfilePage() {
    const profile = await getProfile();
    return (
        <BentoCard title="Edit Profile" className="col-span-1 md:col-span-2">
            <ProfileForm profile={profile} />
        </BentoCard>
    );
}
