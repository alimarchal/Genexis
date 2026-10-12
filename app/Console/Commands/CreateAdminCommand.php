<?php

namespace App\Console\Commands;

use App\Models\User;
use Database\Seeders\RoleAndPermissionSeeder;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rules\Password;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\password;

class CreateAdminCommand extends Command
{
    protected $signature = 'bank:create-admin
        {email : E-mail address used to log in}
        {--name= : Display name (defaults to the part before the @)}
        {--password= : Password (prompted securely when omitted)}';

    protected $description = 'Create a super-admin account (public registration is closed)';

    public function handle(): int
    {
        $email = strtolower(trim($this->argument('email')));
        $name = $this->option('name') ?: ucfirst(strstr($email, '@', true) ?: $email);
        $plain = $this->option('password') ?: password('Password (at least 12 characters)', required: true);

        $validator = Validator::make(
            ['email' => $email, 'name' => $name, 'password' => $plain],
            [
                'email' => ['required', 'email', 'max:255'],
                'name' => ['required', 'string', 'max:255'],
                'password' => ['required', Password::min(12)->letters()->numbers()],
            ]
        );

        if ($validator->fails()) {
            foreach ($validator->errors()->all() as $message) {
                $this->components->error($message);
            }

            return self::FAILURE;
        }

        if (! Role::where('name', 'super-admin')->exists()) {
            $this->callSilently('db:seed', ['--class' => RoleAndPermissionSeeder::class, '--force' => true]);
        }

        $user = User::where('email', $email)->first();
        $existed = $user !== null;

        $user ??= new User(['email' => $email]);
        $user->forceFill([
            'name' => $name,
            'password' => Hash::make($plain),
            'email_verified_at' => $user->email_verified_at ?? now(),
        ])->save();

        $user->assignRole('super-admin');

        $this->components->info(($existed ? 'Updated' : 'Created').' super-admin '.$email);

        return self::SUCCESS;
    }
}
