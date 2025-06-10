<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing menus
        Menu::truncate();

        // Main menu items
        $menus = [
            [
                'title' => 'Home',
                'slug' => 'home',
                'route_name' => 'home',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'About Us',
                'slug' => 'about-us',
                'route_name' => 'about.index',
                'sort_order' => 2,
                'is_active' => true,
                'children' => [
                    [
                        'title' => 'Board of Directors',
                        'slug' => 'board-of-directors',
                        'route_name' => 'about.board-directors',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Management',
                        'slug' => 'management',
                        'route_name' => 'about.management',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Branch Network',
                        'slug' => 'branch-network',
                        'route_name' => 'about.branch-network',
                        'sort_order' => 3,
                    ],
                ],
            ],
            [
                'title' => 'Products',
                'slug' => 'products',
                'url' => '#',
                'sort_order' => 3,
                'is_active' => true,
                'is_mega_menu' => true,
                'children' => [
                    [
                        'title' => 'Liability',
                        'slug' => 'liability',
                        'url' => '#',
                        'sort_order' => 1,
                        'children' => [
                            [
                                'title' => 'Deposit Accounts',
                                'slug' => 'deposit-accounts',
                                'route_name' => 'products.deposit-accounts',
                                'sort_order' => 1,
                            ],
                            [
                                'title' => 'Term Deposit',
                                'slug' => 'term-deposit',
                                'route_name' => 'products.term-deposit',
                                'sort_order' => 2,
                            ],
                        ],
                    ],
                    [
                        'title' => 'Asset',
                        'slug' => 'asset',
                        'url' => '#',
                        'sort_order' => 2,
                        'children' => [
                            [
                                'title' => 'Consumer Finances',
                                'slug' => 'consumer-finances',
                                'route_name' => 'products.consumer-finances',
                                'sort_order' => 1,
                            ],
                            [
                                'title' => 'Commercial / SME Finances',
                                'slug' => 'commercial-sme-finances',
                                'route_name' => 'products.commercial-sme-finances',
                                'sort_order' => 2,
                            ],
                            [
                                'title' => 'Agriculture Finances',
                                'slug' => 'agriculture-finances',
                                'route_name' => 'products.agriculture-finances',
                                'sort_order' => 3,
                            ],
                            [
                                'title' => 'Micro Finances',
                                'slug' => 'micro-finances',
                                'route_name' => 'products.micro-finances',
                                'sort_order' => 4,
                            ],
                        ],
                    ],
                ],
            ],
            [
                'title' => 'Services',
                'slug' => 'services',
                'route_name' => 'services.index',
                'sort_order' => 4,
                'is_active' => true,
                'children' => [
                    [
                        'title' => 'All Services',
                        'slug' => 'all-services',
                        'route_name' => 'services.index',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Home Remittance',
                        'slug' => 'home-remittance',
                        'route_name' => 'services.home-remittance',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Lockers Facility',
                        'slug' => 'lockers-facility',
                        'route_name' => 'services.lockers-facility',
                        'sort_order' => 3,
                    ],
                    [
                        'title' => 'Utility Bills Collection',
                        'slug' => 'utility-bills-collection',
                        'route_name' => 'services.utility-bills-collection',
                        'sort_order' => 4,
                    ],
                    [
                        'title' => 'Services for AJK PSC',
                        'slug' => 'services-for-ajk-psc',
                        'route_name' => 'services.services-for-ajk-psc',
                        'sort_order' => 5,
                    ],
                ],
            ],
            [
                'title' => 'Financials',
                'slug' => 'financials',
                'url' => '#',
                'sort_order' => 5,
                'is_active' => true,
                'children' => [
                    [
                        'title' => 'Statements',
                        'slug' => 'statements',
                        'route_name' => 'financials.statements',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Annual Reports',
                        'slug' => 'annual-reports',
                        'route_name' => 'financials.annualReports',
                        'sort_order' => 2,
                    ],
                    [
                        'title' => 'Financial Highlights',
                        'slug' => 'financial-highlights',
                        'route_name' => 'financials.financialHighlights',
                        'target' => '_blank',
                        'sort_order' => 3,
                    ],
                ],
            ],
            [
                'title' => 'Rates & Charges',
                'slug' => 'rates-charges',
                'url' => '#',
                'sort_order' => 6,
                'is_active' => true,
                'children' => [
                    [
                        'title' => 'Schedule of Charges',
                        'slug' => 'schedule-of-charges',
                        'url' => 'https://bankajk.com/downloads/soc/SOC%20Jul-Dec%2024.pdf',
                        'target' => '_blank',
                        'sort_order' => 1,
                    ],
                    [
                        'title' => 'Profit Rates',
                        'slug' => 'profit-rates',
                        'route_name' => 'rates.profit-rates',
                        'sort_order' => 2,
                    ],
                ],
            ],
            [
                'title' => 'Contact',
                'slug' => 'contact',
                'route_name' => 'contact',
                'sort_order' => 7,
                'is_active' => true,
            ],
        ];

        $this->createMenuItems($menus);
    }

    private function createMenuItems(array $menus, $parentId = null): void
    {
        foreach ($menus as $menuData) {
            $children = $menuData['children'] ?? [];
            unset($menuData['children']);

            $menuData['parent_id'] = $parentId;
            $menuData['is_active'] = $menuData['is_active'] ?? true;

            $menu = Menu::create($menuData);

            if (! empty($children)) {
                $this->createMenuItems($children, $menu->id);
            }
        }
    }
}
