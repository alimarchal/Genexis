import BranchLocator from '@/components/BranchLocator';
import WebsiteLayout from '@/layouts/WebsiteLayout';

interface Branch {
    id: number;
    name: string;
    code: string;
    type: string;
    address: string;
    city: string;
    region: string;
    full_address: string;
    latitude: number | null;
    longitude: number | null;
    phone: string;
    email: string;
    fax: string;
    services: string[];
    facilities: string[];
    operating_hours: Record<string, unknown>;
    is_24_hours: boolean;
    is_open: boolean;
    operating_status: string;
    today_hours: string;
    google_maps_url: string;
    has_atm: boolean;
}

interface Region {
    id: number;
    name: string;
    districts: District[];
}

interface District {
    id: number;
    name: string;
    region_id: number;
}

interface Props {
    branches: Branch[];
    regions: Region[];
    districts: District[];
}

export default function BranchNetwork({ branches, regions, districts }: Props) {
    return (
        <div className="w-full">
            <BranchLocator branches={branches} regions={regions} districts={districts} />
        </div>
    );
}

BranchNetwork.layout = (page: React.ReactNode) => <WebsiteLayout title="About Us">{page}</WebsiteLayout>;
