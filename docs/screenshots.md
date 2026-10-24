# Screenshots

Every page and admin screen added or changed in the latest work, with the module it belongs to. The data shown (album and attraction photos) is demo data generated for these screenshots; the real photos and texts are entered by the content team in the admin panel.

Back to the [README](../README.md).

## Public website

### Home page: Corporate Highlights

The block below the services section. Its items are configured in `config/bank.php` (`bank.highlights`); the location count comes from `BANK_BRANCHES_COUNT`, so it always matches the footer and About Us.

![Home page](screenshots/01-home.jpg)

![Corporate Highlights](screenshots/02-home-corporate-highlights.jpg)

### Photo Gallery (`/gallery`)

Only albums with status **Active** are shown. The cover is the album cover image, or the first photo when no cover is set.

![Gallery albums](screenshots/03-gallery-albums.jpg)

An album shows its photos in a grid; a click opens the lightbox (arrow keys move, `Esc` closes).

![Album photos](screenshots/04-gallery-album-photos.jpg)

![Lightbox](screenshots/05-gallery-lightbox.jpg)

### Tourist Attractions (`/places-to-visit`)

![Tourist attractions](screenshots/06-tourist-attractions.jpg)

Each attraction has a photo, a description and a route map.

![Tourist attraction detail](screenshots/07-tourist-attraction-detail.jpg)

### Footer quick links

Organogram, Photo Gallery and Tourist Attractions are linked from the footer.

![Footer](screenshots/08-footer-quick-links.jpg)

### Other public pages

| Page | Screenshot |
|---|---|
| Organogram (`/about-us/organogram`) | ![Organogram](screenshots/09-organogram.jpg) |
| News (`/news`) | ![News](screenshots/10-news.jpg) |
| Careers (`/join-the-bank`) | ![Careers](screenshots/11-careers.jpg) |
| Downloads (`/documents`) | ![Downloads](screenshots/12-downloads.jpg) |

## Admin panel

New modules appear in the sidebar under **Home**. Access is controlled per action by the permissions `view / create / edit / delete gallery albums` and `... tourist attractions` (granted to super-admin by `php artisan migrate`).

![Dashboard](screenshots/20-admin-dashboard.jpg)

### Photo Gallery (`/gallery-albums`)

![Gallery albums list](screenshots/21-admin-gallery-albums.jpg)

Create an album with a cover and up to 50 photos at a time (JPG/PNG, 10 MB each).

![Create gallery album](screenshots/22-admin-gallery-album-create.jpg)

On edit, click existing photos to mark them for removal and add new ones.

![Edit gallery album](screenshots/23-admin-gallery-album-edit.jpg)

![View gallery album](screenshots/24-admin-gallery-album-view.jpg)

### Tourist Attractions (`/tourist-attractions`)

![Tourist attractions list](screenshots/25-admin-tourist-attractions.jpg)

![Create tourist attraction](screenshots/26-admin-tourist-attraction-create.jpg)

### Existing content modules used for data entry

News, Careers and Downloads already support everything needed to enter the migrated content.

![News admin](screenshots/27-admin-news.jpg)

![Careers admin](screenshots/28-admin-careers.jpg)

![Downloads admin](screenshots/29-admin-downloads.jpg)

## Mobile, tablet and desktop

Every public and admin route was opened at 375 px (phone), 768 px (tablet) and 1440 px (desktop) and checked for page-level horizontal scrolling, HTTP errors and console errors. The pages that needed work now switch layout instead of forcing a sideways scroll.

### Careers (`/join-the-bank`)

Phones and tablets show one card per posting; large screens show a table whose cells wrap.

| Phone | Tablet | Desktop |
|---|---|---|
| ![Careers on a phone](screenshots/responsive/join-the-bank-mobile.jpg) | ![Careers on a tablet](screenshots/responsive/join-the-bank-tablet.jpg) | ![Careers on a desktop](screenshots/responsive/join-the-bank-desktop.jpg) |

Full-length captures: [phone](screenshots/responsive/join-the-bank-mobile-full.jpg), [tablet](screenshots/responsive/join-the-bank-tablet-full.jpg), [desktop](screenshots/responsive/join-the-bank-desktop-full.jpg).

### Downloads (`/documents`)

| Phone | Tablet | Desktop |
|---|---|---|
| ![Downloads on a phone](screenshots/responsive/downloads-mobile.jpg) | ![Downloads on a tablet](screenshots/responsive/downloads-tablet.jpg) | ![Downloads on a desktop](screenshots/responsive/downloads-desktop.jpg) |

### Profit rates (`/rates/profit-rates`)

| Phone | Tablet | Desktop |
|---|---|---|
| ![Profit rates on a phone](screenshots/responsive/profit-rates-mobile.jpg) | ![Profit rates on a tablet](screenshots/responsive/profit-rates-tablet.jpg) | ![Profit rates on a desktop](screenshots/responsive/profit-rates-desktop.jpg) |

### Photo Gallery and Home

| Page | Phone | Tablet | Desktop |
|---|---|---|---|
| Gallery | ![](screenshots/responsive/gallery-mobile.jpg) | ![](screenshots/responsive/gallery-tablet.jpg) | ![](screenshots/responsive/gallery-desktop.jpg) |
| Home | ![](screenshots/responsive/home-mobile.jpg) | ![](screenshots/responsive/home-tablet.jpg) | ![](screenshots/responsive/home-desktop.jpg) |

## Site search

The search (magnifier in the header, `/api/search?q=`) now covers news, services, products, downloads and tenders, branches, board members, management, committees, About Us, financial reports, rates and charges, **careers, photo gallery albums, tourist attractions**, every visible menu item, and the static pages that have no database record (loan calculator, contact, organogram and so on). Results are labelled by type and capped at 40.

| Phone | Tablet | Desktop |
|---|---|---|
| ![Search on a phone](screenshots/responsive/search-mobile.jpg) | ![Search on a tablet](screenshots/responsive/search-tablet.jpg) | ![Search on a desktop](screenshots/responsive/search-desktop.jpg) |

## Regenerating the screenshots

1. Install and build as in the [Quick start](../README.md#quick-start-local-development), seed the database and create an admin with `php artisan bank:create-admin`.
2. Serve the app (`php artisan serve`) and take the pages above with Playwright or any browser at a 1440x900 window.
