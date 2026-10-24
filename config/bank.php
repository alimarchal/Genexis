<?php

/**
 * Bank-specific settings.
 *
 * Every value that used to be read with env() inside controllers/middleware
 * lives here so it keeps working after `php artisan config:cache`.
 * Always read these with config('bank.*'), never with env().
 */
return [
    'loan_rates' => [
        'personal' => (float) env('LOAN_RATE_PERSONAL', 14.0),
        'salary' => (float) env('LOAN_RATE_SALARY', 15.0),
        'car' => (float) env('LOAN_RATE_CAR', 12.5),
        'motorcycle' => (float) env('LOAN_RATE_MOTORCYCLE', 13.5),
        'house' => (float) env('LOAN_RATE_HOUSE', 11.5),
        'student' => (float) env('LOAN_RATE_STUDENT', 10.0),
        'gold' => (float) env('LOAN_RATE_GOLD', 12.0),
        'home_appliances' => (float) env('LOAN_RATE_HOME_APPLIANCES', 13.0),
        'pension' => (float) env('LOAN_RATE_PENSION', 13.0),
        'business' => (float) env('LOAN_RATE_BUSINESS', 13.5),
        'agriculture' => (float) env('LOAN_RATE_AGRICULTURE', 11.0),
    ],
    'loan_limits' => [
        'min_advance_salary' => (int) env('LOAN_MIN_ADVANCE_SALARY', 10000),
        'max_advance_salary' => (int) env('LOAN_MAX_ADVANCE_SALARY', 3000000),
        'tenure_min_advance_salary' => (int) env('LOAN_TENURE_MIN_ADVANCE_SALARY', 1),
        'tenure_max_advance_salary' => (int) env('LOAN_TENURE_MAX_ADVANCE_SALARY', 48),
        'min_car' => (int) env('LOAN_MIN_CAR', 100000),
        'max_car' => (int) env('LOAN_MAX_CAR', 3000000),
        'tenure_min_car' => (int) env('LOAN_TENURE_MIN_CAR', 12),
        'tenure_max_car' => (int) env('LOAN_TENURE_MAX_CAR', 60),
        'min_motorcycle' => (int) env('LOAN_MIN_MOTORCYCLE', 50000),
        'max_motorcycle' => (int) env('LOAN_MAX_MOTORCYCLE', 500000),
        'tenure_min_motorcycle' => (int) env('LOAN_TENURE_MIN_MOTORCYCLE', 12),
        'tenure_max_motorcycle' => (int) env('LOAN_TENURE_MAX_MOTORCYCLE', 36),
        'min_house' => (int) env('LOAN_MIN_HOUSE', 500000),
        'max_house' => (int) env('LOAN_MAX_HOUSE', 10000000),
        'tenure_min_house' => (int) env('LOAN_TENURE_MIN_HOUSE', 12),
        'tenure_max_house' => (int) env('LOAN_TENURE_MAX_HOUSE', 240),
        'min_personal' => (int) env('LOAN_MIN_PERSONAL', 50000),
        'max_personal' => (int) env('LOAN_MAX_PERSONAL', 1000000),
        'tenure_min_personal' => (int) env('LOAN_TENURE_MIN_PERSONAL', 6),
        'tenure_max_personal' => (int) env('LOAN_TENURE_MAX_PERSONAL', 36),
        'min_student' => (int) env('LOAN_MIN_STUDENT', 100000),
        'max_student' => (int) env('LOAN_MAX_STUDENT', 10000000),
        'tenure_min_student' => (int) env('LOAN_TENURE_MIN_STUDENT', 6),
        'tenure_max_student' => (int) env('LOAN_TENURE_MAX_STUDENT', 24),
        'min_gold' => (int) env('LOAN_MIN_GOLD', 25000),
        'max_gold' => (int) env('LOAN_MAX_GOLD', 2000000),
        'tenure_min_gold' => (int) env('LOAN_TENURE_MIN_GOLD', 6),
        'tenure_max_gold' => (int) env('LOAN_TENURE_MAX_GOLD', 24),
        'min_home_appliances' => (int) env('LOAN_MIN_HOME_APPLIANCES', 25000),
        'max_home_appliances' => (int) env('LOAN_MAX_HOME_APPLIANCES', 200000),
        'tenure_min_home_appliances' => (int) env('LOAN_TENURE_MIN_HOME_APPLIANCES', 6),
        'tenure_max_home_appliances' => (int) env('LOAN_TENURE_MAX_HOME_APPLIANCES', 36),
        'min_pension' => (int) env('LOAN_MIN_PENSION', 10000),
        'max_pension' => (int) env('LOAN_MAX_PENSION', 500000),
        'tenure_min_pension' => (int) env('LOAN_TENURE_MIN_PENSION', 6),
        'tenure_max_pension' => (int) env('LOAN_TENURE_MAX_PENSION', 24),
        'min_running_finance' => (int) env('LOAN_MIN_RUNNING_FINANCE', 100000),
        'max_running_finance' => (int) env('LOAN_MAX_RUNNING_FINANCE', 5000000),
        'min_auto_finance' => (int) env('LOAN_MIN_AUTO_FINANCE', 200000),
        'max_auto_finance' => (int) env('LOAN_MAX_AUTO_FINANCE', 5000000),
        'min_demand_finance' => (int) env('LOAN_MIN_DEMAND_FINANCE', 100000),
        'max_demand_finance' => (int) env('LOAN_MAX_DEMAND_FINANCE', 10000000),
        'min_construction_finance' => (int) env('LOAN_MIN_CONSTRUCTION_FINANCE', 500000),
        'max_construction_finance' => (int) env('LOAN_MAX_CONSTRUCTION_FINANCE', 20000000),
        'min_tourism_finance' => (int) env('LOAN_MIN_TOURISM_FINANCE', 100000),
        'max_tourism_finance' => (int) env('LOAN_MAX_TOURISM_FINANCE', 5000000),
        'min_small_business' => (int) env('LOAN_MIN_SMALL_BUSINESS', 50000),
        'max_small_business' => (int) env('LOAN_MAX_SMALL_BUSINESS', 500000),
        'min_healthcare' => (int) env('LOAN_MIN_HEALTHCARE', 100000),
        'max_healthcare' => (int) env('LOAN_MAX_HEALTHCARE', 10000000),
        'min_agriculture_production' => (int) env('LOAN_MIN_AGRICULTURE_PRODUCTION', 10000),
        'max_agriculture_production' => (int) env('LOAN_MAX_AGRICULTURE_PRODUCTION', 200000),
        'tenure_min_agriculture_production' => (int) env('LOAN_TENURE_MIN_AGRICULTURE_PRODUCTION', 3),
        'tenure_max_agriculture_production' => (int) env('LOAN_TENURE_MAX_AGRICULTURE_PRODUCTION', 12),
        'min_agriculture_development' => (int) env('LOAN_MIN_AGRICULTURE_DEVELOPMENT', 50000),
        'max_agriculture_development' => (int) env('LOAN_MAX_AGRICULTURE_DEVELOPMENT', 1000000),
        'tenure_min_agriculture_development' => (int) env('LOAN_TENURE_MIN_AGRICULTURE_DEVELOPMENT', 12),
        'tenure_max_agriculture_development' => (int) env('LOAN_TENURE_MAX_AGRICULTURE_DEVELOPMENT', 60),
        'min_micro_enterprise' => (int) env('LOAN_MIN_MICRO_ENTERPRISE', 10000),
        'max_micro_enterprise' => (int) env('LOAN_MAX_MICRO_ENTERPRISE', 100000),
        'tenure_min_micro_enterprise' => (int) env('LOAN_TENURE_MIN_MICRO_ENTERPRISE', 6),
        'tenure_max_micro_enterprise' => (int) env('LOAN_TENURE_MAX_MICRO_ENTERPRISE', 36),
        'min_poultry' => (int) env('LOAN_MIN_POULTRY', 15000),
        'max_poultry' => (int) env('LOAN_MAX_POULTRY', 50000),
        'calculator_url' => env('LOAN_CALCULATOR_URL', env('LOAN_CALCULATOR', 'https://bankajk.com/loan-calculator')),
    ],
    'social' => [
        'facebook' => env('SOCIAL_FACEBOOK_URL', '#'),
        'twitter' => env('SOCIAL_TWITTER_URL', '#'),
        'instagram' => env('SOCIAL_INSTAGRAM_URL', '#'),
        'linkedin' => env('SOCIAL_LINKEDIN_URL', '#'),
        'youtube' => env('SOCIAL_YOUTUBE_URL', '#'),
    ],
    'footer' => [
        'banking' => [
            'portal_login' => env('PORTAL_LOGIN_URL', 'https://bankajk.com/portal-login'),
            'branch_locator' => env('BRANCH_LOCATOR_URL', 'https://bankajk.com/branch-locator'),
            'atm_locator' => env('ATM_LOCATOR_URL', 'https://bankajk.com/atm-locator'),
            'exchange_rates' => env('EXCHANGE_RATES_URL', 'https://bankajk.com/exchange-rates'),
            'interest_rates' => env('INTEREST_RATES_URL', 'https://bankajk.com/interest-rates'),
            'forms' => env('FORMS_URL', 'https://bankajk.com/forms-applications'),
            'tenders' => env('TENDERS_URL', 'https://bankajk.com/tenders-notices'),
        ],
        'regulatory' => [
            'privacy_policy' => env('PRIVACY_POLICY_URL', 'https://bankajk.com/privacy-policy'),
            'terms' => env('TERMS_URL', 'https://bankajk.com/terms-conditions'),
            'cookie_policy' => env('COOKIE_POLICY_URL', 'https://bankajk.com/cookie-policy'),
            'accessibility' => env('ACCESSIBILITY_URL', 'https://bankajk.com/accessibility'),
            'regulatory_info' => env('REGULATORY_INFO_URL', 'https://bankajk.com/regulatory-information'),
            'security_tips' => env('SECURITY_TIPS_URL', 'https://bankajk.com/security-tips'),
            'fraud_prevention' => env('FRAUD_PREVENTION_URL', 'https://bankajk.com/fraud-prevention'),
            'sbp' => env('SBP_URL', env('SBP', 'https://www.sbp.org.pk')),
            'banking_mohtasib' => env('BANKING_MOHTASIB_URL', env('BANKING_MOHTASIB', 'https://www.bankingmohtasib.gov.pk')),
            'secp' => env('SECP_URL', env('SECP', 'https://www.secp.gov.pk')),
            'goajk' => env('GOAJK_URL', env('GOAJK', 'https://www.ajk.gov.pk')),
            'gopak' => env('GOPAK_URL', env('GOPAK', 'https://www.pakistan.gov.pk')),
            'ajk_tourism' => env('AJK_TOURISM_URL', env('AJK_TOURISM', 'https://tourism.ajk.gov.pk')),
            'ajk_pdo' => env('AJK_PDO_URL', 'https://ajkpdo.com'),
            // Shown in the footer once the address of the Prime Minister page on the AJK web portal is set.
            'ajk_pm_portal' => env('AJK_PM_PORTAL_URL'),
        ],
    ],
    'deposit_rates' => [
        'savings' => (float) env('DEPOSIT_RATE_SAVINGS', 7.0),
        'current' => (float) env('DEPOSIT_RATE_CURRENT', 0.0),
        'term_1year' => (float) env('DEPOSIT_RATE_TERM_1YEAR', 8.5),
        'term_2year' => (float) env('DEPOSIT_RATE_TERM_2YEAR', 9.0),
        'term_3year' => (float) env('DEPOSIT_RATE_TERM_3YEAR', 9.5),
        'term_5year' => (float) env('DEPOSIT_RATE_TERM_5YEAR', 10.0),
        'special_savings' => (float) env('DEPOSIT_RATE_SPECIAL_SAVINGS', 8.0),
    ],
    'stats' => [
        'branches_count' => (int) env('BANK_BRANCHES_COUNT', 87),
        'established_year' => (int) env('BANK_ESTABLISHED_YEAR', 2006),
        'serving_districts' => env('BANK_SERVING_DISTRICTS', 'All Districts of AJK'),
    ],
    'highlights' => [
        ['value' => '2', 'label' => 'Ladies branches (Muzaffarabad and Mirpur)'],
        ['value' => '10%+', 'label' => 'Female managers'],
        ['value' => '17', 'label' => 'Asset products'],
        ['value' => null, 'label' => 'Micro finance for low-income communities'],
    ],
    'contact' => [
        'form_recipient' => env('CONTACT_FORM_RECIPIENT', env('CONTACT_EMAIL', 'info@bankajk.com')),
        'contact_phone' => env('CONTACT_PHONE', '+92.5822.924244'),
        'contact_email' => env('CONTACT_EMAIL', 'info@bankajk.com'),
        'contact_address' => env('CONTACT_ADDRESS', 'Head Office, Bank Square, Chattar Domel, Muzaffarabad, AJK, Pakistan'),
        'company_secretary_phone' => env('COMPANY_SECRETARY_PHONE', '+92-5822-920002'),
        'hrmd_phone' => env('HRMD_PHONE', '+92-5822-923138'),
    ],
    'security' => [
        'csp_enabled' => (bool) env('CSP_ENABLED', true),
        'trusted_proxies' => env('TRUSTED_PROXIES'),
        'force_https' => (bool) env('FORCE_HTTPS', false),
        'api_rate_limit' => (int) env('API_RATE_LIMIT', 60),
        'contact_rate_limit' => (int) env('CONTACT_RATE_LIMIT', 5),
        'download_rate_limit' => (int) env('DOWNLOAD_RATE_LIMIT', 30),
        'web_rate_limit' => (int) env('WEB_RATE_LIMIT', 600),
    ],
    'uploads' => [
        // Size of every chunk the browser sends (bytes). Keep it below the web server's body limit.
        'chunk_size' => (int) env('UPLOAD_CHUNK_BYTES', 4 * 1024 * 1024),
        // Anyone with the module's create/edit permission may upload up to that module's max_bytes below;
        // a super-admin may always upload up to super_admin_max_bytes (or the module limit if that is higher).
        'super_admin_max_bytes' => (int) env('UPLOAD_MAX_BYTES', 10 * 1024 * 1024 * 1024),
        'max_active_per_user' => (int) env('UPLOAD_MAX_ACTIVE', 3),
        // Abandoned uploads (and finished-but-unused files) are removed after this many hours.
        'stale_hours' => (int) env('UPLOAD_STALE_HOURS', 24),
        // Free space that must remain on the disk after the upload (bytes).
        'reserve_bytes' => (int) env('UPLOAD_RESERVE_BYTES', 1024 * 1024 * 1024),
        'contexts' => [
            'financial-reports' => ['max_bytes' => (int) env('UPLOAD_LARGE_MAX_BYTES', 10 * 1024 * 1024 * 1024), 'label' => 'Financial reports', 'permission' => 'financial reports', 'extensions' => ['pdf', 'doc', 'docx', 'xls', 'xlsx']],
            'annual-reports' => ['max_bytes' => (int) env('UPLOAD_LARGE_MAX_BYTES', 10 * 1024 * 1024 * 1024), 'label' => 'Annual reports', 'permission' => 'annual reports', 'extensions' => ['pdf', 'doc', 'docx', 'xls', 'xlsx']],
            'financial-highlights' => ['max_bytes' => (int) env('UPLOAD_LARGE_MAX_BYTES', 10 * 1024 * 1024 * 1024), 'label' => 'Financial highlights', 'permission' => 'financial highlights', 'extensions' => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx']],
            'downloads' => ['max_bytes' => (int) env('UPLOAD_LARGE_MAX_BYTES', 10 * 1024 * 1024 * 1024), 'label' => 'Downloads', 'permission' => 'downloads', 'extensions' => ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png', 'gif', 'zip', 'rar']],
            'schedule-of-charges' => ['max_bytes' => (int) env('UPLOAD_DOCUMENT_MAX_BYTES', 500 * 1024 * 1024), 'label' => 'Schedule of charges', 'permission' => 'schedule of charges', 'extensions' => ['pdf', 'doc', 'docx', 'xls', 'xlsx']],
            'careers' => ['max_bytes' => (int) env('UPLOAD_DOCUMENT_MAX_BYTES', 500 * 1024 * 1024), 'label' => 'Career documents', 'permission' => 'careers', 'extensions' => ['pdf', 'doc', 'docx']],
        ],
        // What the file's real content may look like for each extension (checked with finfo, not the browser's claim).
        'mimes' => [
            'pdf' => ['application/pdf'],
            'doc' => ['application/msword', 'application/CDFV2', 'application/x-ole-storage', 'application/vnd.ms-office'],
            'xls' => ['application/vnd.ms-excel', 'application/CDFV2', 'application/x-ole-storage', 'application/vnd.ms-office'],
            'ppt' => ['application/vnd.ms-powerpoint', 'application/CDFV2', 'application/x-ole-storage', 'application/vnd.ms-office'],
            'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
            'xlsx' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'application/octet-stream'],
            'pptx' => ['application/vnd.openxmlformats-officedocument.presentationml.presentation', 'application/zip', 'application/octet-stream'],
            'zip' => ['application/zip', 'application/x-zip-compressed'],
            'rar' => ['application/vnd.rar', 'application/x-rar', 'application/x-rar-compressed'],
            'jpg' => ['image/jpeg'],
            'jpeg' => ['image/jpeg'],
            'png' => ['image/png'],
            'gif' => ['image/gif'],
        ],
    ],
    /*
     * Maker-checker. A user holding the "submit changes for approval" permission is a maker: what they add, edit or
     * delete in the admin panel is held as a change request until someone with "approve changes" (a checker) approves it.
     * Users without that permission are not affected. Resource route prefixes listed here are never held.
     */
    'maker_checker' => [
        'maker_permission' => 'submit changes for approval',
        'checker_permission' => 'approve changes',
        'excluded_modules' => ['admin.menus', 'admin.contact-submissions'],
    ],
    /*
     * Data extraction API (/api/extract/v1).
     */
    'extraction' => [
        'rate_limit' => (int) env('EXTRACT_RATE_LIMIT', 30), // requests per minute per token
        'default_per_page' => 100,
        'max_per_page' => 1000, // JSON
        'max_per_page_export' => 5000, // CSV and Excel
    ],
];
