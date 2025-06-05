import BranchLocator from '@/components/BranchLocator';
import WebsiteLayout from '@/layouts/WebsiteLayout';

export default function BranchNetwork({ }) {
    return (
        <div className="w-full">
            <BranchLocator />
        </div>
    );
}


BranchNetwork.layout = (page: React.ReactNode) => (
    <WebsiteLayout title="About Us">
        {page}
    </WebsiteLayout>
);
