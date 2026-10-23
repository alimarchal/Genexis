<?php

namespace App\Extraction;

use App\Models\AnnualReport;
use App\Models\BankService;
use App\Models\BoardOfDirector;
use App\Models\BodCommittee;
use App\Models\Branch;
use App\Models\BranchService;
use App\Models\Career;
use App\Models\Carousel;
use App\Models\ContactSubmission;
use App\Models\District;
use App\Models\Division;
use App\Models\Download;
use App\Models\FinancialHighlight;
use App\Models\FinancialReport;
use App\Models\Management;
use App\Models\NewsAnnouncement;
use App\Models\Product;
use App\Models\ProductScheme;
use App\Models\ProductSchemeAttribute;
use App\Models\ProductType;
use App\Models\ProductTypeAccount;
use App\Models\ProfitRate;
use App\Models\Region;
use App\Models\ScheduleOfCharge;
use App\Models\Service;
use App\Models\ServiceAttribute;
use App\Models\TopNavbarMessage;
use App\Models\User;
use Illuminate\Database\Eloquent\Model;

/**
 * Every data set the extraction API offers. To expose another table, add it here.
 */
class DatasetRegistry
{
    /** @var array<string, Dataset>|null */
    private ?array $datasets = null;

    /**
     * @return array<string, Dataset> keyed by slug
     */
    public function all(): array
    {
        return $this->datasets ??= collect($this->definitions())->keyBy('slug')->all();
    }

    public function find(string $slug): ?Dataset
    {
        return $this->all()[$slug] ?? null;
    }

    /**
     * @return list<Dataset>
     */
    private function definitions(): array
    {
        $tracking = ['created_by', 'updated_by', 'created_at', 'updated_at'];
        $active = fn (Dataset $dataset) => $dataset->status('is_active', 1, 0);
        $statusText = fn (Dataset $dataset) => $dataset->status('status', 'active', 'inactive');

        return [
            $statusText(Dataset::make('branches', 'Branches', Branch::class, 'Branch network with location, opening hours and map details.')
                ->fields(['id', 'region_id', 'district_id', 'code', 'type', 'name', 'address', 'latitude', 'longitude', 'map_url', 'directions', 'operating_hours', 'is_24_hours', 'holidays', 'facilities', 'show_on_map', 'map_priority', 'status', ...$tracking])
                ->filterable(['region_id', 'district_id', 'code', 'type', 'show_on_map', 'is_24_hours'])
                ->files(['popup_image' => []])),
            $statusText(Dataset::make('branch-services', 'Branch services', BranchService::class, 'Services offered by each branch, with availability and fees.')
                ->fields(['id', 'branch_id', 'service_name', 'description', 'is_available', 'availability_hours', 'service_fee', 'status', ...$tracking])
                ->filterable(['branch_id', 'is_available'])),
            $statusText(Dataset::make('regions', 'Regions', Region::class, 'Regions of the branch network.')
                ->fields(['id', 'division_id', 'name', 'status', ...$tracking])
                ->filterable(['division_id'])),
            $statusText(Dataset::make('districts', 'Districts', District::class, 'Districts, each belonging to a region.')
                ->fields(['id', 'region_id', 'name', 'status', ...$tracking])
                ->filterable(['region_id'])),
            $active(Dataset::make('divisions', 'Divisions', Division::class, 'Divisions of the bank.')
                ->fields(['id', 'name', 'short_name', 'is_active', ...$tracking])),
            $active(Dataset::make('products', 'Products', Product::class, 'Top level products.')
                ->fields(['id', 'name', 'is_active', ...$tracking])),
            $active(Dataset::make('product-types', 'Product types', ProductType::class, 'Product types, each belonging to a product.')
                ->fields(['id', 'product_id', 'name', 'is_active', ...$tracking])
                ->filterable(['product_id'])),
            $active(Dataset::make('product-type-accounts', 'Product accounts', ProductTypeAccount::class, 'Accounts offered under each product type.')
                ->fields(['id', 'product_type_id', 'name', 'is_active', ...$tracking])
                ->filterable(['product_type_id'])),
            $active(Dataset::make('product-schemes', 'Product schemes', ProductScheme::class, 'Schemes offered under each product account.')
                ->fields(['id', 'product_type_account_id', 'name', 'description', 'is_active', ...$tracking])
                ->filterable(['product_type_account_id'])),
            $active(Dataset::make('product-scheme-attributes', 'Product scheme attributes', ProductSchemeAttribute::class, 'Terms and features of each product scheme.')
                ->fields(['id', 'product_scheme_id', 'attribute_name', 'attribute_value', 'attribute_type', 'sort_order', 'is_active', ...$tracking])
                ->filterable(['product_scheme_id', 'attribute_type'])),
            $active(Dataset::make('services', 'Services', Service::class, 'Services of the bank.')
                ->fields(['id', 'name', 'slug', 'description', 'icon', 'image', 'sort_order', 'meta_data', 'is_active', ...$tracking])
                ->filterable(['slug'])
                ->files(['image' => []])),
            Dataset::make('service-attributes', 'Service attributes', ServiceAttribute::class, 'Details of each service.')
                ->fields(['id', 'service_id', 'attribute_name', 'attribute_value', 'sort_order', ...$tracking])
                ->filterable(['service_id']),
            Dataset::make('bank-services', 'Bank services', BankService::class, 'Homepage banking services.')
                ->fields(['id', 'title', 'description', 'icon', 'products', 'cta_text', 'cta_link', 'color', 'benefits', 'order', 'service_type', 'stat_number', 'stat_label', 'stat_description', 'status', ...$tracking])
                ->filterable(['service_type'])
                ->status('status', 1, 0),
            $active(Dataset::make('profit-rates', 'Profit rates', ProfitRate::class, 'Profit rate history with validity periods.')
                ->fields(['id', 'category', 'rate', 'valid_from', 'valid_to', 'sort_order', 'is_active', ...$tracking])
                ->filterable(['category'])),
            $active(Dataset::make('schedule-of-charges', 'Schedule of charges', ScheduleOfCharge::class, 'Published schedules of charges.')
                ->fields(['id', 'title', 'from', 'to', 'description', 'attachment', 'is_active', ...$tracking])
                ->files(['attachment' => ['url' => fn (Model $model) => route('schedule-of-charges.download', $model)]])),
            $active(Dataset::make('downloads', 'Downloads', Download::class, 'Documents and forms offered for download.')
                ->fields(['id', 'title', 'description', 'category', 'file_path', 'file_type', 'file_size', 'is_featured', 'download_count', 'is_active', ...$tracking])
                ->filterable(['category', 'is_featured'])
                ->files(['file_path' => [
                    'name' => fn (Model $model) => $model->title.'.'.pathinfo((string) $model->file_path, PATHINFO_EXTENSION),
                    'url' => fn (Model $model) => route('public-downloads.download', $model),
                ]])),
            Dataset::make('annual-reports', 'Annual reports', AnnualReport::class, 'Annual reports by fiscal year.')
                ->fields(['id', 'annual_report_fiscal_year', 'annual_report', 'file_name', ...$tracking])
                ->filterable(['annual_report_fiscal_year'])
                ->files(['annual_report' => [
                    'name' => fn (Model $model) => $model->display_file_name,
                    'url' => fn (Model $model) => route('annual-reports.download', $model),
                ]]),
            Dataset::make('financial-reports', 'Financial reports', FinancialReport::class, 'Quarterly, half-yearly and annual statements by fiscal year.')
                ->fields(['id', 'fiscal_year', 'first_quarter_report', 'half_yearly_report', 'third_quarter_report', 'annual_report', ...$tracking])
                ->filterable(['fiscal_year'])
                ->files(collect(['first_quarter_report', 'half_yearly_report', 'third_quarter_report', 'annual_report'])
                    ->mapWithKeys(fn (string $column) => [$column => [
                        'name' => fn (Model $model) => "Financial Statement {$model->fiscal_year} - ".str($column)->headline().'.'.pathinfo((string) $model->{$column}, PATHINFO_EXTENSION),
                        'url' => fn (Model $model) => route('financial-reports.download', [$model, $column]),
                    ]])->all()),
            Dataset::make('financial-highlights', 'Financial highlights', FinancialHighlight::class, 'Financial highlights by fiscal year.')
                ->fields(['id', 'fiscal_year', 'financial_highlights', 'file_name', ...$tracking])
                ->filterable(['fiscal_year'])
                ->files(['financial_highlights' => [
                    'name' => fn (Model $model) => $model->display_file_name,
                    'url' => fn (Model $model) => route('financial-highlights.download', $model),
                ]]),
            Dataset::make('news-announcements', 'News and announcements', NewsAnnouncement::class, 'News and announcements, published or draft.')
                ->fields(['id', 'title', 'slug', 'excerpt', 'content', 'category', 'published_date', 'is_featured', 'is_published', 'image', ...$tracking])
                ->filterable(['category', 'is_featured', 'slug'])
                ->status('is_published', 1, 0)
                ->files(['image' => []]),
            $active(Dataset::make('careers', 'Careers', Career::class, 'Career and internship notices.')
                ->fields(['id', 'title', 'description', 'requirements', 'benefits', 'location', 'closing_date', 'document', 'is_featured', 'views_count', 'is_active', ...$tracking])
                ->filterable(['location', 'is_featured'])
                ->files(['document' => ['url' => fn (Model $model) => route('public-careers.download', $model)]])),
            $active(Dataset::make('board-of-directors', 'Board of directors', BoardOfDirector::class, 'Directors with biography and photo.')
                ->fields(['id', 'title', 'full_name', 'designation', 'short_description', 'full_biography', 'experience', 'achievements', 'image', 'sort_order', 'is_chairman', 'is_active', ...$tracking])
                ->filterable(['is_chairman'])
                ->files(['image' => []])),
            $active(Dataset::make('bod-committees', 'Board committees', BodCommittee::class, 'Board committees and their members.')
                ->fields(['id', 'name', 'description', 'chairman_board_id', 'secretary_board_id', 'secretary_management_id', 'board_members', 'management_members', 'sort_order', 'is_active', ...$tracking])),
            $statusText(Dataset::make('management', 'Management', Management::class, 'Members of management.')
                ->fields(['id', 'title', 'full_name', 'designation', 'description', 'attachment', 'order', 'status', ...$tracking])
                ->files(['attachment' => []])),
            $statusText(Dataset::make('carousels', 'Carousels', Carousel::class, 'Homepage carousel slides.')
                ->fields(['id', 'title', 'description', 'image', 'button_text', 'button_url', 'order', 'status', ...$tracking])
                ->files(['image' => []])),
            $active(Dataset::make('top-navbar-messages', 'Top navbar messages', TopNavbarMessage::class, 'Messages shown in the top bar of the website.')
                ->fields(['id', 'type', 'priority', 'icon', 'text', 'color', 'bg_color', 'sort_order', 'is_active', ...$tracking])
                ->filterable(['type', 'priority'])),
            Dataset::make('contact-submissions', 'Contact submissions', ContactSubmission::class, 'Messages sent through the website contact form (personal data).')
                ->fields(['id', 'name', 'email', 'phone', 'district', 'tehsil', 'place', 'category', 'subject', 'message', 'ip_address', 'user_agent', 'submitted_at', 'created_at', 'updated_at'])
                ->filterable(['category', 'district'])
                ->sensitive(),
            Dataset::make('users', 'Users', User::class, 'Admin users and their roles. Passwords and tokens are never included.')
                ->fields(['id', 'name', 'email', 'email_verified_at', ...$tracking])
                ->computed(['roles' => fn (Model $model) => $model->roles->pluck('name')->sort()->values()->all()], ['roles'])
                ->sensitive(),
        ];
    }
}
