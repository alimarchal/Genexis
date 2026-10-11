<div dir="rtl" lang="ur">

# ڈیپلائے اور سرور کی گائیڈ (آئی ٹی عملے کے لیے)

[← فہرست پر واپس](README.md)

## 1. کیا چاہیے؟

- Linux سرور، **PHP 8.3 یا اس سے اوپر** (8.4 بہتر)، **MariaDB**، Composer، Git
- ویب سرور (nginx/Apache) جس کا **document root** پروجیکٹ کا `public/` فولڈر ہو
- ڈومین اور **https** سرٹیفکیٹ
- بلڈ کے لیے Node.js 22 (یا GitHub Actions سے بنی ہوئی `public/build` فائلیں)

> **ہوشیار:** ویب سرور کی روٹ کبھی پروجیکٹ کا اوپر والا فولڈر نہ ہو۔ ورنہ `.env` اور سورس کوڈ باہر سے کھل سکتا ہے۔

## 2. پہلی بار انسٹالیشن

```bash
git clone https://github.com/alimarchal/Genexis.git /var/www/bajk
cd /var/www/bajk
cp .env.example .env
nano .env                       # نیچے حصہ 3 دیکھیں
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force --seed
php artisan storage:link
php artisan bank:create-admin aap@bankajk.com --name="آپ کا نام"
php artisan bank:check          # کوئی error نہیں آنا چاہیے
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

- `storage/` اور `bootstrap/cache/` کو ویب سرور کے صارف کے لیے writable بنائیں۔
- `public/build` فولڈر: سرور پر `npm ci && npm run build` چلائیں، یا GitHub Actions کے ذریعے خود اپ لوڈ ہونے دیں (حصہ 4)۔
- **پہلے سے چلتی ہوئی ڈیٹابیس** ہو تو `--seed` **نہ** لگائیں، صرف `php artisan migrate --force` چلائیں۔

## 3. `.env` میں ضروری چیزیں (پروڈکشن)

```dotenv
APP_ENV=production
APP_DEBUG=false                 # بہت اہم: true ہو تو غلطی پر راز باہر آ سکتے ہیں
APP_URL=https://آپ-کی-سائٹ
LOG_LEVEL=error

DB_CONNECTION=mariadb
DB_HOST=127.0.0.1
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...

SESSION_SECURE_COOKIE=true
SESSION_ENCRYPT=true

MAIL_MAILER=smtp
MAIL_HOST=آپ-کا-ای-میل-سرور    # mailpit نہیں
MAIL_PORT=587
MAIL_USERNAME=...
MAIL_PASSWORD=...
MAIL_FROM_ADDRESS=noreply@bankajk.com
CONTACT_EMAIL=info@bankajk.com  # رابطہ فارم کی اطلاع یہاں جاتی ہے

TRUSTED_PROXIES=*               # اگر Cloudflare/nginx پراکسی کے پیچھے ہیں
```

بینک کے فون نمبر، پتہ، سوشل لنک، قرض اور ڈپازٹ کی شرحیں بھی اسی فائل میں ہیں (دیکھیں `.env.example`)۔ انہیں بدلنے کے بعد سرور پر `php artisan config:cache` چلانا ضروری ہے۔

**چیک:** `php artisan bank:check` سب غلطیوں اور انتباہات کی فہرست دیتا ہے۔

## 4. خودکار ڈیپلائے (GitHub Actions)

جب آپ کوڈ `main` میں merge کریں تو ٹیسٹ پاس ہونے کے بعد سائٹ خود اپ ڈیٹ ہو سکتی ہے۔

GitHub میں: **Settings ← Secrets and variables ← Actions ← New repository secret**، اور یہ شامل کریں:

| نام | مثال |
|---|---|
| `DEPLOY_HOST` | `server.example.com` |
| `DEPLOY_USER` | `deploy` |
| `DEPLOY_PATH` | `/var/www/bajk` |
| `DEPLOY_SSH_KEY` | صرف ڈیپلائے کے لیے بنائی گئی SSH نجی کلید |
| `DEPLOY_PORT` | `22` (اختیاری) |

یہ سیکرٹس موجود نہ ہوں تو ڈیپلائے خود بخود چھوڑ دیا جاتا ہے۔

ہر ڈیپلائے میں سرور پر یہ ترتیب چلتی ہے (`scripts/deploy.sh`):

1. نیا کوڈ لانا (صرف fast-forward)
2. `composer install --no-dev`
3. **`php artisan bank:check`** — اگر کوئی خطرناک غلطی ہو (مثلاً `APP_DEBUG=true`) تو یہیں رک جاتا ہے اور چلتی ہوئی سائٹ کو ہاتھ نہیں لگاتا
4. سائٹ کچھ لمحوں کے لیے "maintenance" موڈ میں
5. ڈیٹابیس اپ ڈیٹ (`migrate --force`)
6. کیش بنانا، queue دوبارہ شروع کرنا، سائٹ دوبارہ آن

دستی ڈیپلائے: سرور پر `bash scripts/deploy.sh`۔

## 4-الف۔ بڑی فائلوں کے اپلوڈ کے لیے سرور کی ترتیب

- **ویب سرور کی باڈی حد:** nginx میں `client_max_body_size 16m;` (یہ فائل کی حد **نہیں** ہے، صرف ایک ٹکڑے کی ہے۔ فائل 4 MB کے ٹکڑوں میں جاتی ہے)۔ PHP کی `upload_max_filesize` اور `post_max_size` بڑھانے کی ضرورت نہیں۔
- **ڈسک:** خالی جگہ کم از کم فائل کے سائز + 1 GB۔ `php artisan bank:check` کم جگہ پر خبردار کرتا ہے۔
- **شیڈیولر (صفائی کے لیے ضروری):** cron میں یہ لائن لگائیں:
  `* * * * * cd /var/www/bajk && php artisan schedule:run >> /dev/null 2>&1`
  اس سے ادھوری یا استعمال نہ ہونے والی اپلوڈ فائلیں 24 گھنٹے بعد خود حذف ہوتی ہیں۔
- حدیں `.env` میں: `UPLOAD_LARGE_MAX_BYTES` (مالی رپورٹس، سالانہ رپورٹس، ہائی لائٹس، ڈاؤن لوڈز؛ ڈیفالٹ 10 GB)، `UPLOAD_DOCUMENT_MAX_BYTES` (شیڈول اور نوکریاں؛ ڈیفالٹ 500 MB)، `UPLOAD_MAX_BYTES` (سپر ایڈمن کی بالائی حد)۔

## 5. پچھلے ورژن پر واپسی (Rollback)

```bash
git log --oneline -5
git checkout <پچھلا-اچھا-کمٹ>
composer install --no-dev -o
php artisan config:cache && php artisan route:cache && php artisan view:cache
```

ڈیٹابیس کی تبدیلیاں (migrations) صرف اضافہ کرتی ہیں۔ بیک اپ سے ڈیٹابیس صرف تب بحال کریں جب خود migration میں خرابی ہو۔

## 6. بیک اپ

روزانہ خودکار بیک اپ لیں:

- **ڈیٹابیس:** `mysqldump --single-transaction DB_NAME | gzip > backup-$(date +%F).sql.gz`
- **اپ لوڈ فائلیں:** `storage/app/public` فولڈر
- `.env` فائل (الگ محفوظ جگہ پر، کوڈ کے ساتھ نہیں)

بیک اپ کو سرور سے باہر رکھیں اور مہینے میں ایک بار بحال کر کے آزمائیں۔

## 7. سیکیورٹی چیک لسٹ

- [ ] `APP_DEBUG=false` اور `APP_ENV=production`
- [ ] https لازمی، `SESSION_SECURE_COOKIE=true`
- [ ] `.env` فائل ویب سے نہ کھلے، اور اس کے رازوں (APP_KEY، پاس ورڈ) کو چیٹ/ای میل میں نہ بھیجیں۔ اگر بھیج دیے ہوں تو بدل دیں
- [ ] ڈیٹابیس صارف کو صرف اسی ڈیٹابیس کا حق
- [ ] سرور اور PHP کی باقاعدہ اپ ڈیٹ، فائر وال میں صرف 80/443/SSH
- [ ] SSH میں پاس ورڈ کے بجائے کلید، اور ڈیپلائے کے لیے الگ صارف
- [ ] ایڈمن اکاؤنٹس کم از کم، ہر ایک کو صرف ضروری اجازتیں
- [ ] GitHub کے Dependabot کی تجاویز ہر ہفتے دیکھیں اور merge کریں
- [ ] `TRUSTED_PROXIES` درست ہو تاکہ ریٹ لمٹ اصل آئی پی دیکھے

ویب سائٹ میں پہلے سے شامل حفاظتی انتظامات: CSP اور دیگر سیکیورٹی ہیڈرز، فی آئی پی ریٹ لمٹ (صفحات، API، ڈاؤن لوڈ، رابطہ فارم)، اجازتوں کی ہر عمل پر جانچ، بغیر اجازت اضافی اجازتیں دینے کی روک، محفوظ مینیو لنک، لاگ میں گاہک کی معلومات نہ لکھنا۔

## 8. Laravel کا نیا ورژن

نیا ورژن (مثلاً Laravel 14) آئے تو:

1. نئی برانچ بنائیں اور Laravel کی سرکاری upgrade guide پڑھیں۔
2. `composer.json` میں `laravel/framework` کا ورژن بڑھائیں اور `composer update -W` چلائیں۔
3. ساتھ والے پیکیج (`inertia-laravel`, `spatie/*`, `pestphp/*`) کے نئے ورژن بھی لگائیں۔
4. `php artisan test` اور `npm run ci` چلائیں۔ GitHub Actions بھی خود چلاتا ہے۔
5. تمام ٹیسٹ پاس ہوں تو merge کریں۔

کوڈ Laravel کے معیاری طریقوں پر ہے، اس لیے عموماً تبدیلیاں کم ہوتی ہیں۔

</div>
