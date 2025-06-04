General code instructions:

- Don't generate code comments above the methods or code blocks if they are obvious. Generate comments only for something that needs extra explanation for the reasons why that code was written
- When changing the code, don't comment it out, unless specifically instructed. Assume the old code will stay in Git history.

General Laravel instructions:

- If you need to generate a Laravel file, don't create the folder with `mkdir`, instead run command `php artisan make` whenever possible, and then that Artisan command will create the folder itself
- When generating migrations for pivot table, use correct alphabetical order, like "create_project_role_table" instead of "create_role_project_table"

Use Laravel 11+ skeleton structure:

- **Service Providers**: there are no other service providers except AppServiceProvider. Don't create new service providers unless absolutely necessary. Use Laravel 11+ new features, instead. Or, if you really need to create a new service provider, register it in `bootstrap/providers.php` and not `config/app.php` like it used to be before Laravel 11.
- **Event Listeners**: since Laravel 11, Listeners auto-listen for the events if they are type-hinted correctly.
- **Console Scheduler**: scheduled commands should be in `routes/console.php` and not `app/Console/Kernel.php` which doesn't exist since Laravel 11.
- **Middleware**: whenever possible, use Middleware by class name in the routes. But if you do need to register Middleware alias, it should be registered in `bootstrap/app.php` and not `app/Http/Kernel.php` which doesn't exist since Laravel 11.
- **Tailwind**: in new Blade pages, use Tailwind and not Bootstrap, unless instructed otherwise in the prompt. Tailwind is already pre-configured since Laravel 11, with Vite.
- **Faker**: in Factories, use `fake()` helper instead of `$this->faker`.
- **Views**: to create new Blade files, use Artisan command `php artisan make:view` instead of `mkdir` or `touch`.
- **Policies**: Laravel automatically auto-discovers Policies, no need to register them in the Service Providers.

In addition to the specified requirements, adhere to Laravel's official coding standards and best practices. 
The project is built on Laravel 12, utilizing the Laravel React starter kit with native authentication and incorporating spatie/laravel-permission and spatie/laravel-query-builder packages. 
Ensure all packages are updated to the latest versions compatible with Laravel 12.