import BentoCard from './bento-card';
import ThemeToggle from './theme-toggle';

export default function ThemeToggleCard() {
    return (
        <BentoCard className="flex items-center justify-center">
            <ThemeToggle />
        </BentoCard>
    );
}
